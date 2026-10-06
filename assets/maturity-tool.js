/* CTO Toolkit: maturity assessment component. No dependencies. Pairs with tool-share.js.
   MaturityTool.create({
     id, card: '#calculator', title,
     columns: [{key:'current', label:'Current'}, {key:'target', label:'Target'}],   // first column is the scored one
     dims: [{name, hint, next}],             // next = suggested next step when below target
     defaults: {current:[...], target:[...], note:[...]},
     noteLabel: 'Evidence',                  // omit to hide the note column
     extras: [{id, label, type:'number'|'select', options:[[value,label]], value, suffix, min, max}],
     band: function (score) { return 'Walk'; },   // optional label per score
     interpret: function (S) { return html; }      // S = {dims:[{name,vals:{key:n},note,gap}], avg:{key:n}, extra:{id:value}}
   });
*/
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function css() {
    if (document.getElementById('mt-style')) return;
    var st = document.createElement('style'); st.id = 'mt-style';
    st.textContent =
      '.mt-wrap{overflow-x:auto;max-width:100%}' +
      '.mt-table{width:100%;border-collapse:collapse;font-size:13px}' +
      '.mt-table th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.03em;color:var(--ink-soft);padding:6px 6px;border-bottom:1px solid var(--line);font-weight:600}' +
      '.mt-table td{padding:7px 6px;border-bottom:1px solid var(--line);vertical-align:top}' +
      '.mt-table .mt-dim{font-weight:600;color:var(--ink);min-width:150px}' +
      '.mt-table .mt-hint{display:block;font-weight:400;font-size:11px;color:var(--ink-soft);margin-top:2px}' +
      '.mt-table select,.mt-extras input,.mt-extras select,.mt-table input{font-family:inherit;font-size:13px;padding:5px 6px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--ink)}' +
      '.mt-table input.mt-note{width:100%;min-width:160px}' +
      '.mt-extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px 16px;margin:14px 0 4px}' +
      '.mt-extras label{display:flex;flex-direction:column;gap:4px;font-size:12.5px;color:var(--ink)}' +
      '.mt-extras input{width:100%;box-sizing:border-box}' +
      '.mt-sum{background:var(--accent-soft);border-left:3px solid var(--accent);padding:12px 16px;border-radius:0 6px 6px 0;font-size:13px;line-height:1.65;margin-top:16px}' +
      '.mt-bars{margin:14px 0 4px;font-size:12.5px}' +
      '.mt-bar-row{display:grid;grid-template-columns:minmax(120px,190px) 1fr 70px;gap:10px;align-items:center;margin:6px 0}' +
      '.mt-track{position:relative;height:14px;background:var(--line);border-radius:7px}' +
      '.mt-fill{position:absolute;left:0;top:0;bottom:0;background:var(--accent);border-radius:7px}' +
      '.mt-mark{position:absolute;top:-3px;bottom:-3px;width:3px;margin-left:-1px;border-radius:2px}' +
      '.mt-legend{display:flex;flex-wrap:wrap;gap:14px;font-size:11.5px;color:var(--ink-soft);margin-top:4px}' +
      '.mt-legend i{display:inline-block;width:12px;height:10px;border-radius:2px;margin-right:5px;vertical-align:middle}' +
      '.mt-out h4{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft);margin:18px 0 6px}' +
      '.mt-out ul{margin:6px 0 0;padding-left:18px;font-size:13px;line-height:1.6}' +
      '.stage-grid>.stage-cell{min-width:0}' +
      '@media (max-width:560px){.mt-bar-row{grid-template-columns:1fr 60px}.mt-bar-row .mt-track{grid-column:1/3;grid-row:2}' +
      '.mt-table thead{display:none}.mt-table tr{display:flex;flex-wrap:wrap;gap:6px 14px;padding:8px 0;border-bottom:1px solid var(--line)}' +
      '.mt-table td{border:0;padding:0}.mt-table td.mt-dim,.mt-table td.mt-notecell{flex-basis:100%}' +
      '.mt-table td[data-label]::before{content:attr(data-label);display:block;font-size:10.5px;color:var(--ink-soft);text-transform:uppercase;letter-spacing:.03em;margin-bottom:2px}}';
    document.head.appendChild(st);
  }
  var MARK = ['#8A5A2E', '#2E6FB0', '#7B3F9E'];

  function create(o) {
    css();
    var card = document.querySelector(o.card);
    var cell = card.querySelector('.stage-cell');
    var cols = o.columns, dims = o.dims, pid = o.id;
    var h = '<div class="mt-wrap"><table class="mt-table"><thead><tr><th>' + esc(o.dimLabel || 'Dimension') + '</th>';
    cols.forEach(function (c) { h += '<th>' + esc(c.label) + '</th>'; });
    if (o.noteLabel) h += '<th>' + esc(o.noteLabel) + '</th>';
    h += '</tr></thead><tbody>';
    dims.forEach(function (d, i) {
      h += '<tr><td class="mt-dim">' + esc(d.name) + (d.hint ? '<span class="mt-hint">' + esc(d.hint) + '</span>' : '') + '</td>';
      cols.forEach(function (c) {
        h += '<td data-label="' + esc(c.label) + '"><select id="' + pid + '-' + c.key + '-' + i + '" aria-label="' + esc(d.name + ', ' + c.label) + '">';
        for (var v = 1; v <= 5; v++) h += '<option value="' + v + '">' + v + '</option>';
        h += '</select></td>';
      });
      if (o.noteLabel) h += '<td class="mt-notecell" data-label="' + esc(o.noteLabel) + '"><input type="text" class="mt-note" id="' + pid + '-note-' + i + '" aria-label="' + esc(d.name + ', ' + o.noteLabel) + '" placeholder="' + esc(o.notePlaceholder || '') + '"></td>';
      h += '</tr>';
    });
    h += '</tbody></table></div>';
    if (o.extras && o.extras.length) {
      h += '<div class="mt-extras">';
      o.extras.forEach(function (x) {
        h += '<label for="' + pid + '-x-' + x.id + '">' + esc(x.label);
        if (x.type === 'select') {
          h += '<select id="' + pid + '-x-' + x.id + '">' + x.options.map(function (op) { return '<option value="' + esc(op[0]) + '">' + esc(op[1]) + '</option>'; }).join('') + '</select>';
        } else {
          h += '<input type="number" id="' + pid + '-x-' + x.id + '"' + (x.min != null ? ' min="' + x.min + '"' : '') + (x.max != null ? ' max="' + x.max + '"' : '') + (x.step ? ' step="' + x.step + '"' : '') + '>';
        }
        h += '</label>';
      });
      h += '</div>';
    }
    h += '<div class="mt-out" id="' + pid + '-out"></div>';
    cell.innerHTML = h;

    function g(id) { return document.getElementById(id); }
    function read() {
      var S = { dims: [], avg: {}, extra: {} };
      dims.forEach(function (d, i) {
        var vals = {};
        cols.forEach(function (c) { vals[c.key] = parseInt(g(pid + '-' + c.key + '-' + i).value, 10) || 1; });
        var nx = typeof d.next === 'function' ? d.next(vals) : d.next;
        S.dims.push({ name: d.name, next: nx, vals: vals, note: o.noteLabel ? g(pid + '-note-' + i).value.trim() : '', i: i });
      });
      cols.forEach(function (c) { S.avg[c.key] = S.dims.reduce(function (s, d) { return s + d.vals[c.key]; }, 0) / dims.length; });
      (o.extras || []).forEach(function (x) { var e = g(pid + '-x-' + x.id); S.extra[x.id] = x.type === 'select' ? e.value : (e.value === '' ? null : parseFloat(e.value)); });
      var tk = o.targetKey || 'target', sk = o.scoreKey || cols[0].key;
      S.scoreKey = sk; S.targetKey = tk;
      S.dims.forEach(function (d) { d.gap = d.vals[tk] != null ? d.vals[tk] - d.vals[sk] : 0; });
      return S;
    }
    function bars(S) {
      var sk = S.scoreKey;
      var others = cols.filter(function (c) { return c.key !== sk; });
      var b = '<div class="mt-bars">';
      S.dims.forEach(function (d) {
        b += '<div class="mt-bar-row"><span>' + esc(d.name) + '</span><div class="mt-track"><div class="mt-fill" style="width:' + (d.vals[sk] / 5 * 100) + '%"></div>';
        others.forEach(function (c, k) { b += '<div class="mt-mark" style="left:' + (d.vals[c.key] / 5 * 100) + '%;background:' + MARK[k] + '" title="' + esc(c.label + ': ' + d.vals[c.key]) + '"></div>'; });
        b += '</div><span>' + d.vals[sk] + (o.band ? ' ' + esc(o.band(d.vals[sk])) : '') + '</span></div>';
      });
      b += '<div class="mt-legend"><span><i style="background:var(--accent)"></i>' + esc(cols.filter(function (c) { return c.key === sk; })[0].label) + '</span>';
      others.forEach(function (c, k) { b += '<span><i style="background:' + MARK[k] + ';width:3px"></i>' + esc(c.label) + '</span>'; });
      return b + '</div></div>';
    }
    function compute() {
      var S = read();
      var sum = '<div class="mt-sum">';
      cols.forEach(function (c) { sum += esc(c.label) + ' average: <strong>' + S.avg[c.key].toFixed(1) + ' of 5</strong>' + (o.band && c.key === S.scoreKey ? ' (' + esc(o.band(S.avg[c.key])) + ')' : '') + '<br>'; });
      sum += (o.interpret ? o.interpret(S) : '') + '</div>';
      var gaps = S.dims.filter(function (d) { return d.gap > 0; }).sort(function (a, b) { return b.gap - a.gap || a.vals[S.scoreKey] - b.vals[S.scoreKey]; });
      var gt = '';
      if (gaps.length) {
        gt = '<h4>' + esc(o.gapTitle || 'Gaps to target, largest first') + '</h4><div class="mt-wrap"><table class="matrix-table"><tr><th>' + esc(o.dimLabel || 'Dimension') + '</th><th>Now</th><th>Target</th><th>Gap</th>' + (dims.some(function (d) { return d.next; }) ? '<th>Next step</th>' : '') + '</tr>';
        gaps.forEach(function (d) { gt += '<tr><td>' + esc(d.name) + '</td><td>' + d.vals[S.scoreKey] + '</td><td>' + d.vals[S.targetKey] + '</td><td>' + d.gap + '</td>' + (dims.some(function (x) { return x.next; }) ? '<td>' + esc(d.next || '') + '</td>' : '') + '</tr>'; });
        gt += '</table></div>';
      } else if (S.dims[0].vals[S.targetKey] != null) {
        gt = '<h4>Gaps to target</h4><p style="font-size:13px">Every dimension is at or above its target. Check the targets are ambitious enough, then protect the weakest dimension.</p>';
      }
      g(pid + '-out').innerHTML = sum + '<h4>' + esc(o.barsTitle || 'By dimension') + '</h4>' + bars(S) + gt + (o.after ? o.after(S) : '');
      return S;
    }
    function getState() {
      var s = {};
      cols.forEach(function (c) { s[c.key] = dims.map(function (d, i) { return +g(pid + '-' + c.key + '-' + i).value; }); });
      if (o.noteLabel) s.note = dims.map(function (d, i) { return g(pid + '-note-' + i).value; });
      s.extra = {};
      (o.extras || []).forEach(function (x) { s.extra[x.id] = g(pid + '-x-' + x.id).value; });
      return s;
    }
    function setState(s) {
      s = s || {};
      cols.forEach(function (c) { dims.forEach(function (d, i) { var v = s[c.key] && s[c.key][i]; g(pid + '-' + c.key + '-' + i).value = (v >= 1 && v <= 5) ? String(v) : String((o.defaults[c.key] || [])[i] || 3); }); });
      if (o.noteLabel) dims.forEach(function (d, i) { g(pid + '-note-' + i).value = (s.note && s.note[i] != null) ? s.note[i] : ''; });
      (o.extras || []).forEach(function (x) { var v = s.extra && s.extra[x.id] != null ? s.extra[x.id] : x.value; g(pid + '-x-' + x.id).value = v == null ? '' : v; });
      compute();
    }
    setState({ extra: {} });
    setState(o.defaults);
    cell.addEventListener('input', compute);
    cell.addEventListener('change', compute);
    if (window.ToolShare) {
      ToolShare.register({
        id: pid, root: card, title: o.title, getState: getState, setState: setState,
        csv: function () {
          var S = read();
          var head = [o.dimLabel || 'Dimension'].concat(cols.map(function (c) { return c.label; }));
          if (S.dims[0].vals[S.targetKey] != null) head.push('Gap');
          if (o.noteLabel) head.push(o.noteLabel);
          var rows = [head];
          S.dims.forEach(function (d) { var r = [d.name].concat(cols.map(function (c) { return d.vals[c.key]; })); if (d.vals[S.targetKey] != null) r.push(d.gap); if (o.noteLabel) r.push(d.note); rows.push(r); });
          rows.push(['Average'].concat(cols.map(function (c) { return S.avg[c.key].toFixed(2); })));
          (o.extras || []).forEach(function (x) { rows.push([x.label, S.extra[x.id]]); });
          rows.push([]);
          var txt = (o.interpret ? o.interpret(S) : '').replace(/<(br|\/li|\/p|\/div|\/h4)[^>]*>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
          txt.split('\n').forEach(function (l) { if (l.trim()) rows.push([l.trim()]); });
          return rows;
        }
      });
    }
    return { compute: compute, getState: getState, setState: setState };
  }
  window.MaturityTool = { create: create, esc: esc };
})();
