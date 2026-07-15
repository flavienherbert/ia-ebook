#!/usr/bin/env python3
import json

BUILD = "/home/user/ia-ebook/docs/reader-build"

with open(f"{BUILD}/body.html", encoding="utf-8") as f:
    body_html = f.read()
with open(f"{BUILD}/toc.json", encoding="utf-8") as f:
    toc = json.load(f)
with open(f"{BUILD}/style.css", encoding="utf-8") as f:
    css = f.read()
with open(f"{BUILD}/script.js", encoding="utf-8") as f:
    js = f.read()

FRONT_IDS = {"remerciements", "preface", "introduction"}
BACK_IDS = {"conclusion"}

PART_STYLE = {
    0: (220, 8), 1: (222, 45), 2: (280, 35), 3: (14, 82),
    4: (155, 45), 5: (190, 55), 6: (36, 80), 7: (340, 55),
}


def toc_html():
    out = ['<a class="toc-top" href="#top">↑ Couverture</a>']
    for node in toc:
        pid = node["id"]
        ph, ps = None, None
        if pid in FRONT_IDS or pid in BACK_IDS:
            out.append(f'<a class="toc-flat" href="#{pid}">{node["title"]}</a>')
            continue
        part = node["part"]
        ph, ps = PART_STYLE[part]
        label = node["title"] + (f" — {node['sub']}" if node.get("sub") else "")
        out.append(f'<div class="toc-group" style="--ph:{ph};--ps:{ps}%">')
        out.append(f'<p class="toc-part-label"><span class="chip"></span>{label}</p>')
        for child in node["children"]:
            out.append(f'<a href="#{child["id"]}">{child["title"]}</a>')
        out.append("</div>")
    return "".join(out)


TOC_HTML = toc_html()

PAGE = f"""<a id="top"></a>
<div class="topbar">
  <div class="brand-inline">
    <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Ouvrir le sommaire">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
    <span class="brand-mark">DZ</span>
    <span class="brand-title">De zéro à mes premières ventes</span>
  </div>
  <div class="controls">
    <span class="progress-pct" id="progressPct">0%</span>
    <button class="icon-btn" id="themeToggle" aria-label="Changer de thème"></button>
  </div>
</div>
<div class="progress-rail"><div class="progress-fill" id="progressFill"></div></div>
<div class="sidebar-scrim" id="scrim"></div>

<div class="layout">
  <nav class="sidebar" id="sidebar">
    {TOC_HTML}
  </nav>
  <main class="content">
    <div class="content-inner">
      {body_html}
      <div class="book-footer">De zéro à mes premières ventes — Ebook marketing digital · <span id="year"></span></div>
    </div>
  </main>
</div>

<style>
{css}
</style>
<script>
{js}
</script>
"""

with open(f"{BUILD}/final.html", "w", encoding="utf-8") as f:
    f.write(PAGE)

print("wrote", len(PAGE), "chars")
