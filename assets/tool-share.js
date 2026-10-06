/* CTO Toolkit: share, save, print and export for the in-page tools.
   No dependencies, no network calls. State lives in the page URL (#t=...) and in this browser's localStorage.

   Usage, once per tool on a page, after the tool's own script has set up its DOM:
     ToolShare.register({
       id: 'bcc',                          // short, unique on the page
       root: '#bcc-card',                  // element or selector: the tool's card; the toolbar is appended here
       title: 'Business case',             // used in print header and CSV filename
       getState: () => ({...}),            // plain JSON-serializable object
       setState: (s) => {...},             // apply a state object and recompute results
       csv: () => [['Header',...],[...]],  // optional: rows for "Download CSV"
     });
   For simple tools whose inputs all have ids, ToolShare.fields(root, computeFn) returns {getState, setState}.
*/
(function () {
  'use strict';
  var PREFIX = 'ctotk:' + location.pathname + ':';
  var tools = {};
  var order = [];

  function b64e(str) {
    return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64d(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return decodeURIComponent(escape(atob(s)));
  }
  function readHash() {
    var m = location.hash.match(/[#&]t=([^&]+)/);
    if (!m) return null;
    try { return JSON.parse(b64d(m[1])); } catch (e) { return null; }
  }
  function lsGet(id) {
    try { var v = localStorage.getItem(PREFIX + id); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function lsSet(id, v) {
    try { if (v === null) localStorage.removeItem(PREFIX + id); else localStorage.setItem(PREFIX + id, JSON.stringify(v)); } catch (e) {}
  }
  function allState() {
    var out = {};
    order.forEach(function (id) { try { out[id] = tools[id].getState(); } catch (e) {} });
    return out;
  }
  function shareUrl() {
    return location.href.split('#')[0] + '#t=' + b64e(JSON.stringify(allState()));
  }
  var saveTimer = null;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      order.forEach(function (id) { try { lsSet(id, tools[id].getState()); } catch (e) {} });
      if (/[#&]t=/.test(location.hash) && history.replaceState) {
        history.replaceState(null, '', shareUrl());
      }
    }, 400);
  }

  function injectStyle() {
    if (document.getElementById('tk-style')) return;
    var css =
      '.tk-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:14px 20px 16px;padding-top:12px;border-top:1px dashed var(--line,#ddd)}' +
      '.tk-bar button{font:600 12px/1 inherit;font-family:inherit;padding:8px 12px;border-radius:6px;border:1px solid var(--line,#ccc);background:#fff;color:var(--ink,#222);cursor:pointer}' +
      '.tk-bar button:hover{border-color:var(--accent,#2E5E4E);color:var(--accent,#2E5E4E)}' +
      '.tk-bar button.tk-primary{background:var(--accent,#2E5E4E);border-color:var(--accent,#2E5E4E);color:#fff}' +
      '.tk-bar button.tk-primary:hover{color:#fff;opacity:.9}' +
      '.tk-msg{font-size:12px;color:var(--ink-soft,#666);min-height:1em}' +
      '.tk-note{font-size:11.5px;color:var(--ink-soft,#666);margin:0 20px 14px}' +
      '.tk-copybox{flex-basis:100%;font:12px monospace;padding:6px;border:1px solid var(--line,#ccc);border-radius:4px}' +
      '.tk-print-head{display:none}' +
      '.stage-grid>.stage-cell{min-width:0}' +
      '@media print{' +
      'html.tk-printing .tk-hide{display:none!important}' +
      'html.tk-printing .tk-print-path{margin:0!important;padding:0!important;border:0!important;max-width:none!important}' +
      'html.tk-printing .tk-print-target{display:block!important;border:0!important;box-shadow:none!important;break-inside:auto!important}' +
      'html.tk-printing .tk-print-head{display:block!important;margin:0 0 12px;font-size:12px;color:#444}' +
      'html.tk-printing .tk-print-head h1{font-size:18px;margin:0 0 4px}' +
      'html.tk-printing .tk-print-head .tk-url{font-size:9px;word-break:break-all;color:#666;margin-top:2px}' +
      '.tk-bar,.tk-note,.rt-add,.rt-del,.rt-x{display:none!important}' +
      'input,select,textarea{border:1px solid #999!important}' +
      '}';
    var st = document.createElement('style');
    st.id = 'tk-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    return e;
  }

  function flash(bar, text) {
    var m = bar.querySelector('.tk-msg');
    m.textContent = text;
    clearTimeout(m._t);
    m._t = setTimeout(function () { m.textContent = ''; }, 4000);
  }

  function copyLink(bar) {
    var url = shareUrl();
    if (history.replaceState) history.replaceState(null, '', url);
    var done = function () { flash(bar, 'Link copied. Anyone who opens it sees these inputs and results.'); };
    var fallback = function () {
      var box = bar.querySelector('.tk-copybox');
      if (!box) { box = el('input', { 'class': 'tk-copybox', readonly: 'readonly', 'aria-label': 'Share link' }); bar.appendChild(box); }
      box.value = url; box.focus(); box.select();
      flash(bar, 'Copy the link below.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, fallback);
    } else { fallback(); }
  }

  function printTool(t) {
    var target = t.card;
    var head = target.querySelector('.tk-print-head');
    if (!head) {
      head = el('div', { 'class': 'tk-print-head' });
      target.insertBefore(head, target.firstChild);
    }
    var h1 = document.querySelector('h1');
    head.innerHTML = '';
    head.appendChild(el('h1', {}, (h1 ? h1.textContent + ': ' : '') + t.title));
    head.appendChild(el('div', {}, 'Printed ' + new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })));
    head.appendChild(el('div', { 'class': 'tk-url' }, 'Open these inputs again: ' + shareUrl()));
    document.documentElement.classList.add('tk-printing');
    target.classList.add('tk-print-target');
    var hidden = [], path = [];
    for (var n = target; n && n !== document.body; n = n.parentElement) {
      if (n !== target) { n.classList.add('tk-print-path'); path.push(n); }
      var sib = n.parentElement ? n.parentElement.children : [];
      for (var i = 0; i < sib.length; i++) {
        if (sib[i] !== n && !sib[i].classList.contains('tk-hide')) { sib[i].classList.add('tk-hide'); hidden.push(sib[i]); }
      }
    }
    var cleaned = false;
    var cleanup = function () {
      if (cleaned) return; cleaned = true;
      document.documentElement.classList.remove('tk-printing');
      target.classList.remove('tk-print-target');
      hidden.forEach(function (h) { h.classList.remove('tk-hide'); });
      path.forEach(function (h) { h.classList.remove('tk-print-path'); });
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
    setTimeout(cleanup, 1500);
  }

  function downloadCsv(t) {
    var rows = t.csv();
    var text = rows.map(function (r) {
      return r.map(function (c) {
        var s = c === null || c === undefined ? '' : String(c);
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      }).join(',');
    }).join('\r\n');
    var blob = new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' });
    var a = el('a', { href: URL.createObjectURL(blob), download: (t.title || t.id).toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.csv' });
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function register(opts) {
    injectStyle();
    var root = typeof opts.root === 'string' ? document.querySelector(opts.root) : opts.root;
    if (!root) return;
    var card = root.closest('.stage-card') || root;
    var t = { id: opts.id, title: opts.title || 'Tool', getState: opts.getState, setState: opts.setState, csv: opts.csv, card: card };
    tools[t.id] = t;
    order.push(t.id);
    try { t.defaults = JSON.parse(JSON.stringify(opts.getState())); } catch (e) { t.defaults = null; }

    var bar = el('div', { 'class': 'tk-bar', role: 'group', 'aria-label': 'Save and share' });
    var bLink = el('button', { type: 'button', 'class': 'tk-primary' }, 'Copy share link');
    var bPrint = el('button', { type: 'button' }, 'Print or save as PDF');
    bar.appendChild(bLink); bar.appendChild(bPrint);
    if (t.csv) { var bCsv = el('button', { type: 'button' }, 'Download CSV'); bar.appendChild(bCsv); bCsv.onclick = function () { downloadCsv(t); }; }
    var bReset = el('button', { type: 'button' }, 'Reset');
    bar.appendChild(bReset);
    bar.appendChild(el('span', { 'class': 'tk-msg', 'aria-live': 'polite' }));
    bLink.onclick = function () { copyLink(bar); };
    bPrint.onclick = function () { printTool(t); };
    bReset.onclick = function () {
      lsSet(t.id, null);
      if (t.defaults) t.setState(JSON.parse(JSON.stringify(t.defaults)));
      if (/[#&]t=/.test(location.hash) && history.replaceState) history.replaceState(null, '', shareUrl());
      flash(bar, 'Reset to the example values.');
    };
    var anchor = opts.barAfter ? (typeof opts.barAfter === 'string' ? document.querySelector(opts.barAfter) : opts.barAfter) : null;
    if (anchor) anchor.insertAdjacentElement('afterend', bar); else root.appendChild(bar);
    var note = el('p', { 'class': 'tk-note' }, 'Your inputs are saved in this browser only. A share link carries them in the link itself; nothing is sent to a server.');
    bar.insertAdjacentElement('afterend', note);

    // restore: a shared link wins over this browser's saved copy
    var fromHash = readHash();
    var s = fromHash && fromHash[t.id] ? fromHash[t.id] : lsGet(t.id);
    if (s) { try { t.setState(s); } catch (e) { if (window.console) console.warn('ToolShare restore failed', t.id, e); } }
    else if (opts.computeOnLoad !== false && t.defaults) { try { t.setState(JSON.parse(JSON.stringify(t.defaults))); } catch (e) {} }

    root.addEventListener('input', scheduleSave, true);
    root.addEventListener('change', scheduleSave, true);
    root.addEventListener('click', function (e) { if (!bar.contains(e.target)) scheduleSave(); }, true);
    return t;
  }

  /* Generic state for tools whose inputs all carry ids inside root. */
  function fields(root, compute) {
    root = typeof root === 'string' ? document.querySelector(root) : root;
    var list = function () { return Array.prototype.slice.call(root.querySelectorAll('input[id],select[id],textarea[id]')); };
    return {
      getState: function () {
        var o = {};
        list().forEach(function (f) { o[f.id] = f.type === 'checkbox' || f.type === 'radio' ? f.checked : f.value; });
        return o;
      },
      setState: function (s) {
        list().forEach(function (f) {
          if (!(f.id in s)) return;
          if (f.type === 'checkbox' || f.type === 'radio') f.checked = !!s[f.id]; else f.value = s[f.id];
          f.dispatchEvent(new Event('input', { bubbles: true }));
          f.dispatchEvent(new Event('change', { bubbles: true }));
        });
        if (compute) compute();
      }
    };
  }


  /* Rows for CSV from every table (and optionally paragraph text) inside an element. */
  function tableRows(sel, withText) {
    var root = typeof sel === 'string' ? document.querySelector(sel) : sel;
    var rows = [];
    if (!root) return rows;
    if (withText) {
      Array.prototype.forEach.call(root.querySelectorAll('p,li'), function (p) {
        if (p.closest('table')) return;
        var t = p.innerText.trim(); if (t) rows.push([t]);
      });
      if (rows.length) rows.push([]);
    }
    Array.prototype.forEach.call(root.querySelectorAll('table'), function (tb, k) {
      if (k) rows.push([]);
      Array.prototype.forEach.call(tb.rows, function (r) {
        rows.push(Array.prototype.map.call(r.cells, function (c) { return c.innerText.trim(); }));
      });
    });
    return rows;
  }
  /* Rows for CSV from labelled inputs: [label, value]. */
  function inputRows(sel) {
    var root = typeof sel === 'string' ? document.querySelector(sel) : sel;
    var rows = [];
    Array.prototype.forEach.call(root.querySelectorAll('input[id],select[id],textarea[id]'), function (f) {
      var lab = root.querySelector('label[for="' + f.id + '"]');
      var name = f.getAttribute('aria-label') || (lab && lab.innerText.trim()) || f.id;
      var val = f.tagName === 'SELECT' && f.selectedIndex >= 0 ? f.options[f.selectedIndex].text : (f.type === 'checkbox' ? (f.checked ? 'yes' : 'no') : f.value);
      rows.push([name, val]);
    });
    return rows;
  }
  window.ToolShare = { register: register, fields: fields, shareUrl: shareUrl, changed: scheduleSave, tableRows: tableRows, inputRows: inputRows };
})();
