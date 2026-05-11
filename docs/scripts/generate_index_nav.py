#!/usr/bin/env python3
"""
Generate `docs/shared/nav-links.js` and update `docs/index.html` question lists
based on HTML files placed in `docs/RS`, `docs/PMZS`, `docs/MS`, `docs/PaISR`.

Usage:
  python docs/scripts/generate_index_nav.py

What it does:
- Scans the four group folders under `docs/` (if missing, they are ignored).
- Collects HTML files (non-shared, excluding index.html).
- Builds a mapping of numeric question -> relative path (e.g. "8" -> "PMZS/8_...html").
- Writes `docs/shared/nav-links.js` with `enabledByNumber` entries using paths relative to the docs root.
- Generates card HTML snippets for `docs/index.html` and replaces content between markers:
  <!-- AUTO:PMZS-START --> ... <!-- AUTO:PMZS-END --> etc.

Notes:
- This tool does not move or rename files. Put your HTML files into the appropriate folder
  (`docs/PMZS`, `docs/MS`, `docs/PaISR`, `docs/RS`) before running.
- The script updates links used in index and nav mapping; ensure your page headers use relative
  paths to `../shared/nav-links.js` when placed into subfolders (the README explains this).

"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]  # docs/
SHARED = ROOT / 'shared'
INDEX = ROOT / 'index.html'
GROUPS = ['RS', 'PMZS', 'MS', 'PaISR']

def find_html_files():
    files = {}
    for g in GROUPS:
        p = ROOT / g
        if not p.exists():
            continue
        for f in sorted(p.glob('*.html')):
            files.setdefault(g, []).append(f.name)
    # Also accept HTML files in root (legacy)
    root_files = [f.name for f in sorted(ROOT.glob('*.html')) if f.name not in ('index.html',)]
    if root_files:
        files.setdefault('root', []).extend(root_files)
    return files

NUM_RE = re.compile(r'^(\d{1,3})')

def build_enabled_map(files_by_group):
    enabled = {}
    for g, files in files_by_group.items():
        if g == 'root':
            prefix = ''
        else:
            prefix = f"{g}/"
        for name in files:
            m = NUM_RE.match(name)
            if m:
                num = m.group(1)
                enabled[num] = prefix + name
    return enabled

NAV_TEMPLATE = '''(function () {{
  const enabledByNumber = {enabled};

  const fallbackByNumber = {fallback};

  const allAnchors = document.querySelectorAll(".nav-dropdown a");
  allAnchors.forEach((anchor) => {{
    const text = (anchor.textContent || "").trim();
    const match = text.match(/^(\\d+)\\./);
    if (!match) {{
      return;
    }}

    const number = match[1];
    if (enabledByNumber[number]) {{
      anchor.setAttribute("href", enabledByNumber[number]);
      anchor.classList.remove("nav-disabled");
      return;
    }}

    if (fallbackByNumber[number]) {{
      anchor.setAttribute("href", fallbackByNumber[number]);
      anchor.classList.add("nav-disabled");
    }}
  }});
}})();
'''

# FIXED: Changed {{ ... }} to { ... }
FALLBACKS = {
  '1':'index.html#rs','2':'index.html#rs','3':'index.html#rs','4':'index.html#rs','5':'index.html#rs','6':'index.html#rs','7':'index.html#rs',
  '13':'index.html#pmzs','14':'index.html#pmzs',
  '15':'index.html#ms','16':'index.html#ms','17':'index.html#ms','18':'index.html#ms'
}

def write_nav_js(enabled_map):
    SHARED.mkdir(parents=True, exist_ok=True)
    enabled_repr = '{' + ',\n    '.join([f'"{k}": "{v}"' for k,v in sorted(enabled_map.items(), key=lambda x:int(x[0]))]) + '}'
    fallback_repr = '{' + ',\n    '.join([f'"{k}": "{v}"' for k,v in sorted(FALLBACKS.items(), key=lambda x:int(x[0]))]) + '}'
    content = NAV_TEMPLATE.format(enabled=enabled_repr, fallback=fallback_repr)
    (SHARED / 'nav-links.js').write_text(content, encoding='utf-8')
    print(f'Wrote {SHARED / "nav-links.js"}')

CARD_TMPL = '<a class="question-card" href="{href}">\n  <span class="tag">{tag}</span>\n  <h3>{title}</h3>\n  <p>{desc}</p>\n</a>'


def short_title_and_desc(path: Path):
    txt = path.read_text(encoding='utf-8')
    # try to get title from <h1> or <title>
    title = re.search(r'<h1>(.+?)</h1>', txt, re.S)
    if title:
        t = re.sub(r'\s+', ' ', title.group(1)).strip()
    else:
        t = path.stem
    # short desc: first <p> under hero or in document
    p = re.search(r'<p>([\s\S]*?)</p>', txt, re.S)
    desc = re.sub(r'<[^>]+>', '', p.group(1)).strip() if p else ''
    desc = (desc[:160] + '...') if len(desc) > 160 else desc
    return t, desc


def generate_index_sections(files_by_group):
    # Read index template
    index_text = INDEX.read_text(encoding='utf-8')
    for g in ['PMZS','MS','PaISR']:
        files = files_by_group.get(g, [])
        cards = []
        for fname in sorted(files):
            href = f"{g}/{fname}"
            title, desc = short_title_and_desc(ROOT / g / fname)
            tag = 'Otázka ' + (NUM_RE.match(fname).group(1) if NUM_RE.match(fname) else g)
            cards.append(CARD_TMPL.format(href=href, tag=tag, title=title, desc=desc))
        section_html = '\n        '.join(cards) if cards else '<div class="question-card disabled">\n          <span class="tag">{}</span>\n          <h3>Nezpracováno</h3>\n          <p>Žádné soubory v této kategorii.</p>\n        </div>'.format(g)
        start_marker = f'<!-- AUTO:{g}-START -->'
        end_marker = f'<!-- AUTO:{g}-END -->'
        if start_marker in index_text and end_marker in index_text:
            pre, rest = index_text.split(start_marker,1)
            _, post = rest.split(end_marker,1)
            index_text = pre + start_marker + '\n      <div class="question-list">\n        ' + section_html + '\n      </div>\n      ' + end_marker + post
        else:
            print(f'Warning: markers for {g} not found in index.html; skipping update for this section')
    INDEX.write_text(index_text, encoding='utf-8')
    print(f'Updated {INDEX}')


def main():
    files = find_html_files()
    enabled = build_enabled_map(files)
    write_nav_js(enabled)
    if INDEX.exists():
        generate_index_sections(files)
    else:
        print('docs/index.html not found; skipping index update')

if __name__ == '__main__':
    main()