/* CTO Toolkit: editable row table. No dependencies.
   var t = RowTable.create({
     mount: element, id: 'dr',
     columns: [{key:'name', label:'System', type:'text', width:'180px'},
               {key:'cost', label:'Downtime cost / hour ($)', type:'number', min:0, step:1000},
               {key:'tier', label:'Tier', type:'select', options:[['99','99%'],...]}],
     rows: [{...}], blank: {...}, addLabel: 'Add system', min: 1, max: 20, onChange: fn
   });
   t.get() -> array of row objects (numbers parsed), t.set(rows)
*/
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function css() {
    if (document.getElementById('rt-style')) return;
    var st = document.createElement('style'); st.id = 'rt-style';
    st.textContent =
      '.stage-grid>.stage-cell{min-width:0}' +
      '.rt-wrap{overflow-x:auto;max-width:100%}' +
      '.rt-table{width:100%;border-collapse:collapse;font-size:13px}' +
      '.rt-table th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.03em;color:var(--ink-soft);padding:6px 5px;border-bottom:1px solid var(--line);font-weight:600;vertical-align:bottom}' +
      '.rt-table td{padding:6px 5px;border-bottom:1px solid var(--line);vertical-align:top}' +
      '.rt-table input,.rt-table select{font-family:inherit;font-size:13px;padding:5px 6px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--ink);width:100%;box-sizing:border-box;min-width:60px}' +
      '.rt-table input[type=number]{min-width:70px}' +
      '.rt-del{background:none;border:0;color:var(--ink-soft);cursor:pointer;font-size:12px;font-weight:600;padding:6px 4px}' +
      '.rt-del:hover{color:#B23B3B}' +
      '.rt-add{margin-top:10px;font-family:inherit;font-size:12.5px;font-weight:600;padding:7px 12px;border-radius:6px;border:1px solid var(--accent);background:#fff;color:var(--accent);cursor:pointer}' +
      '.rt-add:hover{background:var(--accent-soft)}' +
      '.tool-out{margin-top:16px}' +
      '.tool-sum{background:var(--accent-soft);border-left:3px solid var(--accent);padding:12px 16px;border-radius:0 6px 6px 0;font-size:13px;line-height:1.65}' +
      '.tool-out h4{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft);margin:18px 0 6px}' +
      '.tool-out ul{margin:6px 0 0;padding-left:18px;font-size:13px;line-height:1.6}' +
      '.tool-extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px 16px;margin:4px 0 14px}' +
      '.tool-extras label{display:flex;flex-direction:column;gap:4px;font-size:12.5px;color:var(--ink)}' +
      '.tool-extras input,.tool-extras select{font-family:inherit;font-size:13px;padding:6px 7px;border:1px solid var(--line);border-radius:6px;background:#fff;width:100%;box-sizing:border-box}' +
      '.tag{display:inline-block;font-size:11px;font-weight:700;padding:2px 7px;border-radius:999px}' +
      '.tag.good{background:var(--accent-soft);color:var(--accent)}.tag.bad{background:#F6E3E3;color:#9B2C2C}.tag.mid{background:#F3E9DC;color:#8A5A2E}' +
      '@media (max-width:640px){.rt-table thead{display:none}.rt-table tr{display:flex;flex-wrap:wrap;gap:8px 12px;padding:10px 0;border-bottom:1px solid var(--line)}' +
      '.rt-table td{border:0;padding:0;flex:1 1 130px}.rt-table td.rt-wide{flex-basis:100%}.rt-table td.rt-x{flex:0 0 auto;align-self:flex-end}' +
      '.rt-table td[data-label]::before{content:attr(data-label);display:block;font-size:10.5px;color:var(--ink-soft);text-transform:uppercase;letter-spacing:.03em;margin-bottom:3px}}';
    document.head.appendChild(st);
  }
  function create(o) {
    css();
    var rows = (o.rows || []).map(function (r) { return Object.assign({}, r); });
    var wrap = document.createElement('div');
    var tw = document.createElement('div'); tw.className = 'rt-wrap';
    var table = document.createElement('table'); table.className = 'rt-table';
    tw.appendChild(table); wrap.appendChild(tw);
    var add = document.createElement('button'); add.type = 'button'; add.className = 'rt-add'; add.textContent = '+ ' + (o.addLabel || 'Add row');
    wrap.appendChild(add);
    o.mount.appendChild(wrap);

    function cell(c, r, i) {
      var id = o.id + '-' + c.key + '-' + i, v = r[c.key] == null ? '' : r[c.key], a = ' id="' + id + '" data-k="' + c.key + '" data-i="' + i + '" aria-label="' + esc(c.label) + '"';
      if (c.type === 'select') return '<select' + a + '>' + c.options.map(function (op) { return '<option value="' + esc(op[0]) + '"' + (String(op[0]) === String(v) ? ' selected' : '') + '>' + esc(op[1]) + '</option>'; }).join('') + '</select>';
      var t = c.type === 'number' ? 'number' : (c.type === 'date' ? 'date' : 'text');
      return '<input type="' + t + '"' + a + ' value="' + esc(v) + '"' + (c.min != null ? ' min="' + c.min + '"' : '') + (c.max != null ? ' max="' + c.max + '"' : '') + (c.step != null ? ' step="' + c.step + '"' : '') + (c.placeholder ? ' placeholder="' + esc(c.placeholder) + '"' : '') + '>';
    }
    function render() {
      var h = '<thead><tr>' + o.columns.map(function (c) { return '<th' + (c.width ? ' style="min-width:' + c.width + '"' : '') + '>' + esc(c.label) + '</th>'; }).join('') + '<th></th></tr></thead><tbody>';
      rows.forEach(function (r, i) {
        h += '<tr>' + o.columns.map(function (c) { return '<td data-label="' + esc(c.label) + '"' + (c.wide ? ' class="rt-wide"' : '') + '>' + cell(c, r, i) + '</td>'; }).join('') +
          '<td class="rt-x"><button type="button" class="rt-del" data-del="' + i + '" aria-label="Remove row ' + (i + 1) + '"' + (rows.length <= (o.min || 0) ? ' disabled' : '') + '>Remove</button></td></tr>';
      });
      table.innerHTML = h + '</tbody>';
      add.disabled = o.max != null && rows.length >= o.max;
      add.style.display = add.disabled ? 'none' : '';
    }
    function parse(c, val) {
      if (c.type === 'number') { var n = parseFloat(val); return isNaN(n) ? null : n; }
      return val;
    }
    table.addEventListener('input', function (e) {
      var t = e.target, k = t.getAttribute('data-k'); if (!k) return;
      var c = o.columns.filter(function (x) { return x.key === k; })[0];
      rows[+t.getAttribute('data-i')][k] = parse(c, t.value);
      if (o.onChange) o.onChange();
    });
    table.addEventListener('change', function (e) {
      var t = e.target, k = t.getAttribute('data-k'); if (!k) return;
      var c = o.columns.filter(function (x) { return x.key === k; })[0];
      rows[+t.getAttribute('data-i')][k] = parse(c, t.value);
      if (o.onChange) o.onChange();
    });
    table.addEventListener('click', function (e) {
      var d = e.target.getAttribute('data-del'); if (d == null) return;
      rows.splice(+d, 1); render(); if (o.onChange) o.onChange();
    });
    add.addEventListener('click', function () {
      rows.push(Object.assign({}, o.blank || {})); render();
      var f = table.querySelector('tr:last-child input,tr:last-child select'); if (f) f.focus();
      if (o.onChange) o.onChange();
    });
    render();
    return {
      get: function () { return rows.map(function (r) { return Object.assign({}, r); }); },
      set: function (rs) {
        rows = (Array.isArray(rs) ? rs : []).slice(0, o.max || 200).map(function (r) {
          var x = {}; o.columns.forEach(function (c) {
            var v = r && r[c.key] != null ? r[c.key] : (o.blank || {})[c.key];
            if (c.type === 'number') { v = parseFloat(v); if (isNaN(v)) v = null; }
            if (c.type === 'select' && !c.options.some(function (op) { return String(op[0]) === String(v); })) v = c.options[0][0];
            x[c.key] = v == null ? (c.type === 'number' ? null : '') : v;
          }); return x;
        });
        render();
      },
      render: render
    };
  }
  /* Extras: a small labelled grid of single inputs. Returns {get, set}. */
  function extras(mount, id, fields) {
    css();
    var d = document.createElement('div'); d.className = 'tool-extras';
    d.innerHTML = fields.map(function (f) {
      var fid = id + '-x-' + f.key;
      var input = f.type === 'select'
        ? '<select id="' + fid + '">' + f.options.map(function (op) { return '<option value="' + esc(op[0]) + '">' + esc(op[1]) + '</option>'; }).join('') + '</select>'
        : '<input type="' + (f.type || 'number') + '" id="' + fid + '"' + (f.min != null ? ' min="' + f.min + '"' : '') + (f.max != null ? ' max="' + f.max + '"' : '') + (f.step != null ? ' step="' + f.step + '"' : '') + '>';
      return '<label for="' + fid + '">' + esc(f.label) + input + '</label>';
    }).join('');
    mount.appendChild(d);
    function el(k) { return document.getElementById(id + '-x-' + k); }
    return {
      get: function () { var o = {}; fields.forEach(function (f) { var v = el(f.key).value; o[f.key] = (f.type === 'select' || f.type === 'text' || f.type === 'date') ? v : (v === '' ? null : parseFloat(v)); }); return o; },
      set: function (s) { s = s || {}; fields.forEach(function (f) { var v = s[f.key] != null ? s[f.key] : f.value; el(f.key).value = v == null ? '' : v; }); }
    };
  }
  function money(n) { return (n < 0 ? '-$' : '$') + Math.round(Math.abs(n)).toLocaleString(); }
  if (document.head) css(); else document.addEventListener('DOMContentLoaded', css);
  window.RowTable = { create: create, extras: extras, esc: esc, money: money };
})();
