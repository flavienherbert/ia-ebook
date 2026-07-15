#!/usr/bin/env python3
"""Convert the ebook markdown into a styled HTML body fragment + a TOC tree."""
import re
import html
import json
import unicodedata

SRC = "/home/user/ia-ebook/docs/ebook-marketing-digital.md"

with open(SRC, encoding="utf-8") as f:
    raw_lines = f.read().split("\n")

lines = [l for l in raw_lines if not l.startswith("% ")]

# ---------- part hue/sat table ----------
PART_STYLE = {
    0: (220, 8),    # front/back matter - neutral
    1: (222, 45),   # Partie 1 - comprendre (blue/indigo)
    2: (280, 35),   # Partie 2 - creer (violet)
    3: (14, 82),    # Partie 3 - trouver clients (flame/accent)
    4: (155, 45),   # Partie 4 - ventes (emerald)
    5: (190, 55),   # Partie 5 - developper (teal)
    6: (36, 80),    # Partie 6 - erreurs (amber)
    7: (340, 55),   # Bonus (rose)
}

CALLOUT_STYLE = {
    "tip": 1, "case": 2, "exercise": 3, "retain": 4, "example": 5, "warn": 6, "bonus": 7,
}


def slugify(text):
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[\s_]+", "-", text)


def esc(s):
    return html.escape(s, quote=False)


def inline(s):
    s = esc(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<em>\1</em>", s)
    return s


TOC = []  # list of dicts: {id, title, kind, part, children:[]}
current_part_node = None

body = []
i = 0
n = len(lines)
current_part_idx = 0
current_section_slug = ""

in_recap = False
recap_buffer = []


def emit(x):
    global in_recap, recap_buffer
    if in_recap:
        recap_buffer.append(x)
    else:
        body.append(x)


def close_recap():
    global in_recap, recap_buffer
    if in_recap:
        body.append('<div class="chapter-recap">' + "".join(recap_buffer) + "</div>")
        in_recap = False
        recap_buffer = []


def flush_ordered(items, start):
    cls = "msg-list" if any(k in current_section_slug for k in
                            ("script", "email", "accroche", "appel", "relance")) else ""
    out = [f'<ol class="{cls}" start="{start}">']
    for it in items:
        out.append(f"<li>{inline(it)}</li>")
    out.append("</ol>")
    return "".join(out)


def flush_bullets(items):
    out = ['<ul>']
    for it in items:
        out.append(f"<li>{inline(it)}</li>")
    out.append("</ul>")
    return "".join(out)


def flush_checklist(items):
    out = ['<ul class="checklist">']
    for idx, it in enumerate(items):
        out.append(
            f'<li><label><input type="checkbox" data-chk="{idx}">'
            f'<span>{inline(it)}</span></label></li>'
        )
    out.append("</ul>")
    return "".join(out)


def flush_table(rows):
    header = rows[0]
    body_rows = rows[2:] if len(rows) > 1 else []
    out = ['<div class="table-wrap"><table><thead><tr>']
    for c in header:
        out.append(f"<th>{inline(c)}</th>")
    out.append("</tr></thead><tbody>")
    for r in body_rows:
        out.append("<tr>")
        for c in r:
            out.append(f"<td>{inline(c)}</td>")
        out.append("</tr>")
    out.append("</tbody></table></div>")
    return "".join(out)


def split_row(line):
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [c.strip() for c in line.split("|")]


def is_sep_row(cells):
    return all(re.match(r"^:?-+:?$", c.strip()) for c in cells if c.strip() != "")


CASE_COLORS = list(range(1, 8))


def case_avatar(descriptor):
    name = descriptor.split(",")[0].strip()
    initial = name[0].upper() if name else "?"
    idx = CASE_COLORS[sum(ord(c) for c in name) % len(CASE_COLORS)] if name else 2
    return initial, idx, name


while i < n:
    line = lines[i]
    stripped = line.strip()

    if stripped == "":
        i += 1
        continue

    # code fence
    if stripped.startswith("```"):
        i += 1
        code_lines = []
        while i < n and not lines[i].strip().startswith("```"):
            code_lines.append(lines[i])
            i += 1
        i += 1  # skip closing fence
        emit(f'<pre class="code-block"><code>{esc(chr(10).join(code_lines))}</code></pre>')
        continue

    # table
    if stripped.startswith("|"):
        rows = []
        while i < n and lines[i].strip().startswith("|"):
            rows.append(split_row(lines[i]))
            i += 1
        if len(rows) > 1 and is_sep_row(rows[1]):
            pass
        emit(flush_table(rows))
        continue

    # blockquote
    if stripped.startswith(">"):
        qlines = []
        while i < n and lines[i].strip().startswith(">"):
            t = lines[i].strip()[1:]
            if t.startswith(" "):
                t = t[1:]
            qlines.append(t)
            i += 1
        first = qlines[0]
        m_whole = re.match(r"^\*\*(.+)\*\*$", first.strip())
        m_partial = re.match(r"^\*\*([^*]+?)\*\*\s*(.*)$", first.strip())
        label_raw = None
        rest_first = first
        if m_whole:
            label_raw = m_whole.group(1)
            rest_first = ""
        elif m_partial:
            label_raw = m_partial.group(1)
            rest_first = m_partial.group(2)

        kind = "quote"
        label_kind = ""
        descriptor = ""
        if label_raw:
            parts = re.split(r"\s*:\s*", label_raw, maxsplit=1)
            label_kind = parts[0].strip()
            descriptor = parts[1].strip() if len(parts) > 1 else ""
            lk = label_kind.lower()
            if "erreur" in lk:
                kind = "warn"
            elif "conseil" in lk or "astuce" in lk:
                kind = "tip"
            elif "retenir" in lk:
                kind = "retain"
            elif "cas fictiv" in lk or "cas fictive" in lk or "etude de cas" in unicodedata.normalize("NFKD", lk).encode("ascii","ignore").decode():
                kind = "case"
            elif "exemple" in lk:
                kind = "example"
            elif "exercice" in lk:
                kind = "exercise"
            else:
                kind = "note"

        rest_lines = [rest_first] if rest_first else []
        rest_lines += qlines[1:]
        # split into paragraphs on blank separator lines
        paragraphs = []
        cur = []
        for t in rest_lines:
            if t == "":
                if cur:
                    paragraphs.append(" ".join(cur))
                    cur = []
            else:
                cur.append(t)
        if cur:
            paragraphs.append(" ".join(cur))
        if not paragraphs:
            paragraphs = [""]
        text = " ".join(paragraphs)
        paragraphs_html = "".join(f"<p>{inline(p)}</p>" for p in paragraphs)

        if kind == "case":
            initial, cidx, name = case_avatar(descriptor)
            ph, ps = PART_STYLE[cidx]
            emit(
                f'<aside class="callout callout-case" style="--ph:{ph};--ps:{ps}%">'
                f'<div class="callout-case-head">'
                f'<span class="avatar">{esc(initial)}</span>'
                f'<div><span class="tag">Étude de cas</span>'
                f'<strong class="case-name">{inline(descriptor)}</strong></div>'
                f'</div>'
                f'{paragraphs_html}</aside>'
            )
        elif kind == "quote":
            emit(f'<blockquote class="pull-quote">{inline(text)}</blockquote>')
        elif kind == "note":
            label_html = f"<strong>{inline(label_kind)} :</strong> " if label_kind else ""
            first_p = f"<p>{label_html}{inline(paragraphs[0]) if paragraphs else ''}</p>"
            rest_p = "".join(f"<p>{inline(p)}</p>" for p in paragraphs[1:])
            emit(f'<aside class="callout callout-note">{first_p}{rest_p}</aside>')
        else:
            cidx = CALLOUT_STYLE.get(kind, 1)
            ph, ps = PART_STYLE[cidx]
            tag_label = {
                "tip": "Conseil de pro", "warn": "Erreur à éviter", "retain": "À retenir",
                "example": "Exemple", "exercise": "Exercice",
            }.get(kind, label_kind or "Note")
            emit(
                f'<aside class="callout callout-{kind}" style="--ph:{ph};--ps:{ps}%">'
                f'<span class="tag">{esc(tag_label)}</span>'
                f'{paragraphs_html}</aside>'
            )
        continue

    # checklist item
    m = re.match(r"^- \[ \] (.*)$", stripped)
    if m:
        items = []
        while i < n:
            mm = re.match(r"^- \[ \] (.*)$", lines[i].strip())
            if not mm:
                break
            items.append(mm.group(1))
            i += 1
        emit(flush_checklist(items))
        continue

    # ordered list
    m = re.match(r"^(\d+)\.\s+(.*)$", stripped)
    if m:
        start = int(m.group(1))
        items = []
        while i < n:
            mm = re.match(r"^(\d+)\.\s+(.*)$", lines[i].strip())
            if not mm:
                break
            items.append(mm.group(2))
            i += 1
        emit(flush_ordered(items, start))
        continue

    # bullet list
    if re.match(r"^- (.*)$", stripped):
        items = []
        while i < n:
            mm = re.match(r"^- (.*)$", lines[i].strip())
            if not mm:
                break
            items.append(mm.group(1))
            i += 1
        emit(flush_bullets(items))
        continue

    # horizontal rule
    if re.match(r"^-{3,}$", stripped):
        i += 1
        continue

    # headings
    m = re.match(r"^# (.*)$", stripped)
    if m:
        close_recap()
        title = m.group(1)
        i += 1
        # subtitle right under book title (very first heading)
        if title.startswith("DE ZÉRO"):
            subtitle = ""
            if i < n and lines[i].strip().startswith("## "):
                subtitle = lines[i].strip()[3:]
                i += 1
            emit(
                '<header class="cover">'
                '<p class="cover-eyebrow">Ebook — Marketing digital</p>'
                f'<h1 class="cover-title">{inline(title)}</h1>'
                f'<p class="cover-subtitle">{inline(subtitle)}</p>'
                '</header>'
            )
            continue
        # determine part index
        pm = re.match(r"^PARTIE (\d+) — (.*)$", title)
        bm = title.startswith("BONUS")
        if pm:
            idx = int(pm.group(1))
            label = f"Partie {pm.group(1)}"
            subtitle = pm.group(2)
        elif bm:
            idx = 7
            label = "Bonus"
            subtitle = title.split("—", 1)[1].strip() if "—" in title else ""
        else:
            idx = 0
            label = title
            subtitle = ""
        current_part_idx = idx
        slug = slugify(title)
        ph, ps = PART_STYLE[idx]
        node = {"id": slug, "title": title if not (pm or bm) else f"{label}", "sub": subtitle, "kind": "part", "part": idx, "children": []}
        TOC.append(node)
        current_part_node = node
        eyebrow = "Sommaire" if idx == 0 else label
        emit(
            f'<section class="part-divider" id="{slug}" style="--ph:{ph};--ps:{ps}%">'
            f'<span class="part-eyebrow">{esc(eyebrow)}</span>'
            f'<h1 class="part-title">{inline(subtitle if (pm or bm) else title)}</h1>'
            + (f'<p class="part-sub">{inline(label)}</p>' if (pm or bm) else "")
            + '<svg class="part-motif" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">'
              f'<polyline points="0,35 30,28 55,30 80,14 110,20 140,6 170,10 200,2" />'
              '</svg>'
            '</section>'
        )
        continue

    m = re.match(r"^## Chapitre (\d+) — (.*)$", stripped)
    if m:
        close_recap()
        num = m.group(1)
        title = m.group(2)
        slug = f"chap-{num}"
        ph, ps = PART_STYLE[current_part_idx]
        if current_part_node is not None:
            current_part_node["children"].append({"id": slug, "title": f"{num}. {title}"})
        current_section_slug = slug
        emit(
            f'<div class="chapter-head" id="{slug}" style="--ph:{ph};--ps:{ps}%">'
            f'<span class="chapter-num">Chapitre {num.zfill(2)}</span>'
            f'<h2>{inline(title)}</h2></div>'
        )
        i += 1
        continue

    m = re.match(r"^## (.*)$", stripped)
    if m:
        close_recap()
        title = m.group(1)
        slug = slugify(title)
        current_section_slug = slug
        if current_part_node is not None:
            current_part_node["children"].append({"id": slug, "title": title})
        emit(f'<h2 class="section-head" id="{slug}">{inline(title)}</h2>')
        i += 1
        continue

    m = re.match(r"^### (.*)$", stripped)
    if m:
        title = m.group(1)
        cls = ""
        low = title.lower()
        if "résumé du chapitre" in low:
            in_recap = True
            cls = ' class="recap-head"'
        elif "points clés" in low or "actions à mettre" in low:
            cls = ' class="recap-head"'
        emit(f"<h3{cls}>{inline(title)}</h3>")
        i += 1
        continue

    # bold-only line (mini heading) or "chapitre suivant" nav
    m = re.match(r"^\*\*(.+)\*\*$", stripped)
    if m:
        content = m.group(1)
        if content.startswith("Chapitre suivant"):
            emit(f'<p class="next-chapter">→ {inline(content)}</p>')
            close_recap()
        else:
            emit(f'<p class="mini-head">{inline(content)}</p>')
        i += 1
        continue

    # plain paragraph
    text = stripped
    cls = ""
    if text.startswith("Objet :"):
        cls = ' class="email-subject"'
    elif text.startswith("«") and text.endswith("»"):
        cls = ' class="email-body"'
    emit(f"<p{cls}>{inline(text)}</p>")
    i += 1

close_recap()
body_html = "\n".join(body)

with open("/home/user/ia-ebook/docs/reader-build/body.html", "w", encoding="utf-8") as f:
    f.write(body_html)

with open("/home/user/ia-ebook/docs/reader-build/toc.json", "w", encoding="utf-8") as f:
    json.dump(TOC, f, ensure_ascii=False, indent=2)

print("OK", len(body_html), "chars body,", len(TOC), "toc parts")
