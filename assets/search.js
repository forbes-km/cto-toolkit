/* CTO Toolkit — site search
   Self-contained: injects its own CSS and markup into #cto-search-root.
   Reads window.CTO_BASE (relative path back to site root) which each
   page sets before including this script:
     root index.html:      window.CTO_BASE = "";
     tools/<slug>/index.html: window.CTO_BASE = "../../";
*/
(function () {
  var BASE = (typeof window.CTO_BASE === "string") ? window.CTO_BASE : "";
  var mount = document.getElementById("cto-search-root");
  if (!mount) return;

  // ---------- styles (scoped, matches site's paper/ink/accent palette) ----------
  var style = document.createElement("style");
  style.textContent = [
    "#cto-search-root{max-width:1100px;margin:0 auto 28px;padding:0 32px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    ".cto-search-inner{max-width:720px;position:relative;}",
    ".cto-search-box{display:flex;align-items:center;gap:8px;border:1px solid var(--line,#DCDAD2);background:#fff;border-radius:9px;padding:10px 14px;transition:border-color .12s ease;}",
    ".cto-search-box:focus-within{border-color:var(--accent,#2E5E4E);}",
    ".cto-search-box svg{flex:0 0 auto;color:var(--ink-soft,#52564F);}",
    ".cto-search-input{flex:1;border:0;outline:0;background:transparent;font-size:14.5px;color:var(--ink,#1C1E1B);font-family:inherit;}",
    ".cto-search-input::placeholder{color:var(--ink-soft,#52564F);opacity:.8;}",
    ".cto-search-kbd{font-family:var(--mono,ui-monospace,monospace);font-size:11px;color:var(--ink-soft,#52564F);border:1px solid var(--line,#DCDAD2);border-radius:4px;padding:1px 6px;flex:0 0 auto;}",
    ".cto-search-results{display:none;position:absolute;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid var(--line,#DCDAD2);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.08);max-height:420px;overflow-y:auto;z-index:40;}",
    ".cto-search-results.open{display:block;}",
    ".cto-search-result{display:block;padding:11px 14px;text-decoration:none;color:inherit;border-bottom:1px solid var(--line,#DCDAD2);}",
    ".cto-search-result:last-child{border-bottom:0;}",
    ".cto-search-result:hover,.cto-search-result.active{background:var(--accent-soft,#E4EDE8);}",
    ".cto-search-result-top{display:flex;align-items:baseline;gap:8px;margin-bottom:2px;}",
    ".cto-search-result-title{font-size:14px;font-weight:600;color:var(--ink,#1C1E1B);}",
    ".cto-search-result-title mark{background:var(--amber-soft,#F3E9DA);color:inherit;padding:0 1px;border-radius:2px;}",
    ".cto-search-result-section{font-size:11px;color:var(--ink-soft,#52564F);text-transform:uppercase;letter-spacing:.04em;}",
    ".cto-search-result-badge{font-size:10px;font-weight:600;color:var(--accent,#2E5E4E);border:1px solid var(--accent,#2E5E4E);border-radius:20px;padding:1px 7px;}",
    ".cto-search-result-snippet{font-size:12.5px;color:var(--ink-soft,#52564F);line-height:1.45;}",
    ".cto-search-result-snippet mark{background:var(--amber-soft,#F3E9DA);color:inherit;padding:0 1px;border-radius:2px;}",
    ".cto-search-empty{padding:16px 14px;font-size:13px;color:var(--ink-soft,#52564F);}",
    ".cto-search-count{padding:8px 14px 2px;font-size:11px;color:var(--ink-soft,#52564F);text-transform:uppercase;letter-spacing:.04em;}"
  ].join("\n");
  document.head.appendChild(style);

  // ---------- markup ----------
  mount.innerHTML =
    '<div class="cto-search-inner">' +
      '<div class="cto-search-box">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
        '<input class="cto-search-input" type="text" placeholder="Search all 60+ pages\u2026 (e.g. \u201cbreak-even\u201d, \u201czero trust\u201d, \u201cRACI\u201d)" autocomplete="off" spellcheck="false">' +
        '<span class="cto-search-kbd">/</span>' +
      '</div>' +
      '<div class="cto-search-results"></div>' +
    '</div>';

  var input = mount.querySelector(".cto-search-input");
  var resultsEl = mount.querySelector(".cto-search-results");
  var data = null;
  var activeIndex = -1;
  var currentMatches = [];

  fetch(BASE + "assets/search-index.json")
    .then(function (r) { return r.json(); })
    .then(function (json) { data = json; })
    .catch(function () {
      // fail quietly: search box just won't return results if the index can't load
      data = [];
    });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function highlight(text, terms) {
    var out = escapeHtml(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }

  function snippetAround(body, terms) {
    if (!body) return "";
    var lower = body.toLowerCase();
    var pos = -1;
    for (var i = 0; i < terms.length; i++) {
      var p = lower.indexOf(terms[i]);
      if (p !== -1 && (pos === -1 || p < pos)) pos = p;
    }
    if (pos === -1) return body.slice(0, 160) + (body.length > 160 ? "\u2026" : "");
    var start = Math.max(0, pos - 60);
    var end = Math.min(body.length, pos + 140);
    var snippet = (start > 0 ? "\u2026" : "") + body.slice(start, end) + (end < body.length ? "\u2026" : "");
    return snippet;
  }

  function score(record, terms) {
    var s = 0;
    var title = record.title.toLowerCase();
    var desc = (record.description || "").toLowerCase();
    var body = (record.body || "").toLowerCase();
    var section = (record.section || "").toLowerCase();

    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      if (title === t) s += 60;
      else if (title.indexOf(t) !== -1) s += 30;
      if (desc.indexOf(t) !== -1) s += 12;
      if (section.indexOf(t) !== -1) s += 6;
      var bodyMatches = body.split(t).length - 1;
      if (bodyMatches > 0) s += Math.min(bodyMatches, 5) * 3;
      if (s === 0) return 0; // this term matched nothing at all -> whole query fails AND logic below
    }
    return s;
  }

  function search(query) {
    if (!data || !data.length) return [];
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var results = [];
    for (var i = 0; i < data.length; i++) {
      var record = data[i];
      var hay = (record.title + " " + record.description + " " + record.section + " " + record.body).toLowerCase();
      var allMatch = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      if (!allMatch) continue;
      var sc = score(record, terms);
      if (sc > 0) results.push({ record: record, score: sc, terms: terms });
    }
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 10);
  }

  function render(matches, query) {
    currentMatches = matches;
    activeIndex = -1;
    if (!query.trim()) {
      resultsEl.classList.remove("open");
      resultsEl.innerHTML = "";
      return;
    }
    if (!matches.length) {
      resultsEl.innerHTML = '<div class="cto-search-empty">No matches for \u201c' + escapeHtml(query) + '\u201d. Try a different term.</div>';
      resultsEl.classList.add("open");
      return;
    }
    var html = '<div class="cto-search-count">' + matches.length + (matches.length === 10 ? "+" : "") + ' result' + (matches.length === 1 ? "" : "s") + '</div>';
    matches.forEach(function (m, i) {
      var r = m.record;
      var href = BASE + r.url;
      var badge = r.badge ? '<span class="cto-search-result-badge">' + escapeHtml(r.badge) + '</span>' : "";
      var snippet = snippetAround(r.body || r.description, m.terms);
      html += '<a class="cto-search-result" data-idx="' + i + '" href="' + href + '">' +
        '<div class="cto-search-result-top">' +
          '<span class="cto-search-result-title">' + highlight(r.title, m.terms) + '</span>' +
          badge +
        '</div>' +
        '<div class="cto-search-result-section">' + escapeHtml(r.section || "") + '</div>' +
        '<div class="cto-search-result-snippet">' + highlight(snippet, m.terms) + '</div>' +
      '</a>';
    });
    resultsEl.innerHTML = html;
    resultsEl.classList.add("open");
  }

  var debounceTimer;
  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    var q = input.value;
    debounceTimer = setTimeout(function () {
      render(search(q), q);
    }, 60);
  });

  input.addEventListener("keydown", function (e) {
    var items = resultsEl.querySelectorAll(".cto-search-result");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!items.length) return;
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items.forEach(function (el, i) { el.classList.toggle("active", i === activeIndex); });
      items[activeIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      activeIndex = Math.max(activeIndex - 1, 0);
      items.forEach(function (el, i) { el.classList.toggle("active", i === activeIndex); });
      items[activeIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && items[activeIndex]) {
        window.location.href = items[activeIndex].getAttribute("href");
      } else if (currentMatches.length) {
        window.location.href = BASE + currentMatches[0].record.url;
      }
    } else if (e.key === "Escape") {
      input.blur();
      resultsEl.classList.remove("open");
    }
  });

  document.addEventListener("click", function (e) {
    if (!mount.contains(e.target)) resultsEl.classList.remove("open");
  });

  input.addEventListener("focus", function () {
    if (input.value.trim()) resultsEl.classList.add("open");
  });

  // global "/" shortcut to jump into search, like most doc sites
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== input) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      input.focus();
    }
  });
})();
