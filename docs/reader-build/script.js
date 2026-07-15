(function(){
  var root = document.documentElement;
  var STORAGE_THEME = "dzmp-theme";
  var STORAGE_CHECK = "dzmp-checks";

  // ---- theme ----
  var themeBtn = document.getElementById("themeToggle");
  function applyThemeIcon(){
    var isDark = (root.getAttribute("data-theme") === "dark") ||
      (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    themeBtn.innerHTML = isDark ? ICON_SUN : ICON_MOON;
  }
  var ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
  try{
    var saved = localStorage.getItem(STORAGE_THEME);
    if(saved) root.setAttribute("data-theme", saved);
  }catch(e){}
  applyThemeIcon();
  themeBtn.addEventListener("click", function(){
    var current = root.getAttribute("data-theme");
    var isDarkNow = current === "dark" || (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var next = isDarkNow ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try{ localStorage.setItem(STORAGE_THEME, next); }catch(e){}
    applyThemeIcon();
  });

  // ---- mobile sidebar ----
  var sidebar = document.getElementById("sidebar");
  var menuBtn = document.getElementById("menuToggle");
  var scrim = document.getElementById("scrim");
  function closeSidebar(){ sidebar.classList.remove("open"); scrim.classList.remove("show"); }
  function openSidebar(){ sidebar.classList.add("open"); scrim.classList.add("show"); }
  menuBtn.addEventListener("click", function(){
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });
  scrim.addEventListener("click", closeSidebar);
  sidebar.addEventListener("click", function(e){
    if(e.target.tagName === "A") closeSidebar();
  });

  // ---- progress + active toc link ----
  var fill = document.getElementById("progressFill");
  var pct = document.getElementById("progressPct");
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".sidebar a[href^='#']"));
  var anchors = tocLinks.map(function(a){
    var id = a.getAttribute("href").slice(1);
    return { link: a, el: document.getElementById(id) };
  }).filter(function(x){ return x.el; });

  function onScroll(){
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    fill.style.width = (p*100).toFixed(1) + "%";
    pct.textContent = Math.round(p*100) + "%";

    var current = null;
    for(var i=0;i<anchors.length;i++){
      var rect = anchors[i].el.getBoundingClientRect();
      if(rect.top < 160) current = anchors[i]; else break;
    }
    tocLinks.forEach(function(a){ a.classList.remove("active"); });
    if(current) current.link.classList.add("active");
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // ---- checklist persistence ----
  try{
    var checks = JSON.parse(localStorage.getItem(STORAGE_CHECK) || "{}");
  }catch(e){ var checks = {}; }
  var boxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  boxes.forEach(function(box, idx){
    var key = "c" + idx;
    if(checks[key]) box.checked = true;
    box.addEventListener("change", function(){
      checks[key] = box.checked;
      try{ localStorage.setItem(STORAGE_CHECK, JSON.stringify(checks)); }catch(e){}
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
