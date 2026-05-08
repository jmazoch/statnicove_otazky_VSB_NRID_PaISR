# Instrukce pro AI asistenta — Státnicové otázky VSB NRID PaISR

Tento soubor slouží jako kontext pro Copilot / Claude / jiný AI asistent. Přečti ho celý před jakoukoli prací na projektu.

---

## Struktura projektu

```
docs/
├── index.html                  ← hlavní stránka s přehledem otázek
├── COPILOT_INSTRUCTIONS.md     ← tento soubor
├── shared/
│   ├── navbar-styles.css       ← CSS pro navbar + gradient pozadí (importuje se v <head>)
│   ├── nav-links.js            ← dynamicky patchuje href v navbar dropdownu (jen pro index.html)
│   └── navbar-template.html    ← referenční šablona navbar HTML (jen pro čtení)
├── scripts/
│   └── generate_index_nav.py   ← automaticky aktualizuje index.html a nav-links.js
├── PMZS/                       ← Pokročilé metody zpracování signálů (otázky 8–14)
├── MS/                         ← Měřicí systémy (otázky 15–20)
├── PaISR/                      ← Předměty pro specializaci (FreeRTOS, Android, SWI...)
└── RS/                         ← Regulační systémy (otázky 1–7, zatím nezpracované)
```

---

## Aktuálně zpracované otázky

| Soubor | Složka | Stav |
|--------|--------|------|
| `8_statnice_okenni_funkce.html` | PMZS | ✅ hotovo |
| `9_statnice_frekvencni.html` | PMZS | ✅ hotovo |
| `10_frekvencni_spektra_modulace.html` | PMZS | ✅ hotovo |
| `11_Amplitudové analogové modulace, úhlové analogové modulace.html` | PMZS | ✅ hotovo |
| `12_Systémy pro zpracování signálu.html` | PMZS | ✅ hotovo |
| `19_Přehled základních typů drátových a bezdrátový.html` | MS | ✅ hotovo |
| `20_EMC.html` | MS | ✅ hotovo |
| `statnice_freertos.html` | PaISR | ✅ hotovo |
| `mobilni_platformy_statnice.html` | PaISR | ✅ hotovo |

Zbývá: RS 1–7, PMZS 13–14, MS 15–18, PaISR SWI

---

## Jak přidat novou otázku (postup krok za krokem)

### 1. Pojmenuj soubor správně

- Číslované otázky: `{číslo}_{slug}.html` — např. `13_prevod_signalu.html`
- PaISR bez čísla: `{slug}.html` — např. `swi_statnice.html`

### 2. Umísti soubor do správné složky

| Otázka | Složka |
|--------|--------|
| RS 1–7 | `docs/RS/` |
| PMZS 8–14 | `docs/PMZS/` |
| MS 15–20 | `docs/MS/` |
| PaISR (FreeRTOS, SWI, Android…) | `docs/PaISR/` |

### 3. Použij šablonu stránky (viz níže)

Zkopíruj šablonu, vyplň obsah. Navbar je hardcoded v HTML — cesty jsou relativní k umístění souboru (`../index.html`, `../PMZS/8_...` atd.).

### 4. Spusť generátor pro automatickou aktualizaci index.html a nav-links.js

```bash
python docs/scripts/generate_index_nav.py
```

Skript prohledá složky PMZS/, MS/, PaISR/, RS/ a:
- přepíše `docs/shared/nav-links.js` s aktuálními cestami
- aktualizuje sekce v `docs/index.html` označené markery `<!-- AUTO:PMZS-START -->` … `<!-- AUTO:PMZS-END -->` (totéž pro MS, PaISR)

Pokud Python není dostupný, řekni asistentovi: **„Přidej otázku X do index.html a nav-links.js manuálně"**.

---

## Šablona nové stránky

Tuto šablonu zkopíruj pro každou novou otázku. Nahraď `{SLOŽKA}`, `{NÁZEV}`, `{ČÍSLO}` a obsah.

```html
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Státnicová otázka {ČÍSLO} – {NÁZEV}</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
/* Barvy — sdílené s celým webem */
:root {
  --bg: #f6f1e8; --bg-alt: #ebe3d4;
  --surface: rgba(255,252,246,0.92); --surface-strong: #fffdf8;
  --text: #1f241f; --muted: #5f665c;
  --line: rgba(31,36,31,0.12);
  --brand: #25533b; --brand-strong: #173627;
  --accent: #c26d2c;
  --shadow: 0 18px 55px rgba(39,52,43,0.12);
}
body { font-family: Georgia, serif; font-size: 15px; line-height: 1.75; color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(194,109,44,0.16), transparent 34%),
    radial-gradient(circle at right 20%, rgba(37,83,59,0.12), transparent 28%),
    linear-gradient(180deg, var(--bg), var(--bg-alt));
  min-height: 100vh; }
a { color: inherit; }
/* Navbar */
.topbar { position: sticky; top: 0; z-index: 30; backdrop-filter: blur(14px);
  background: rgba(246,241,232,0.82); border-bottom: 1px solid var(--line); }
.topbar-inner { max-width: 1180px; margin: 0 auto; padding: 14px 20px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: flex; flex-direction: column; gap: 2px; text-decoration: none; color: var(--brand-strong); }
.brand strong { font-size: 18px; letter-spacing: 0.02em; }
.brand span { font-size: 12px; color: var(--muted); }
.nav-toggle { display: none; align-items: center; justify-content: center;
  width: 46px; height: 46px; border: 1px solid var(--line); border-radius: 14px;
  background: var(--surface-strong); color: var(--brand-strong); cursor: pointer; }
.nav-toggle span, .nav-toggle span::before, .nav-toggle span::after {
  display: block; width: 20px; height: 2px; background: currentColor;
  border-radius: 999px; position: relative; transition: transform 0.25s ease, opacity 0.25s ease; }
.nav-toggle span::before, .nav-toggle span::after { content: ""; position: absolute; left: 0; }
.nav-toggle span::before { top: -6px; }
.nav-toggle span::after { top: 6px; }
.nav-links { display: flex; align-items: center; gap: 10px; }
.nav-item { position: relative; display: flex; align-items: center; }
.nav-links a, .nav-item > a { text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;
  font-weight: 700; color: var(--brand-strong); padding: 10px 14px; border-radius: 999px;
  transition: background 0.2s, color 0.2s, transform 0.2s; display: flex; align-items: center; gap: 6px; }
.nav-links a:hover, .nav-item > a:hover { background: rgba(37,83,59,0.08); color: var(--brand); transform: translateY(-1px); }
.nav-dropdown { position: absolute; top: 100%; left: 0; background: var(--surface-strong);
  min-width: 220px; border-radius: 12px; border: 1px solid var(--line);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12); display: none; flex-direction: column; z-index: 999; }
.nav-item:hover .nav-dropdown, .nav-item.is-open .nav-dropdown { display: flex; }
.nav-dropdown a { padding: 10px 14px; border-radius: 0; background: transparent;
  font-size: 13px; border-bottom: 1px solid var(--line); }
.nav-dropdown a:last-child { border-bottom: none; }
.nav-dropdown a:hover { background: rgba(37,83,59,0.08); }
.nav-links a.nav-disabled { color: var(--muted); opacity: 0.7; pointer-events: none; }
.nav-item > a .nav-chevron { font-size: 10px; transition: transform 0.2s; }
/* Obsah stránky */
.page { max-width: 900px; margin: 0 auto; padding: 40px 48px 60px;
  background: #fff; box-shadow: var(--shadow); }
h1 { font-size: 26px; font-weight: 700; color: var(--brand-strong);
  border-bottom: 3px solid var(--brand); padding-bottom: 12px; margin-bottom: 6px; }
.subtitle { font-size: 13px; color: var(--muted); margin-bottom: 36px; font-style: italic; }
h2 { font-size: 19px; font-weight: 700; color: var(--brand-strong);
  margin: 36px 0 10px; padding-left: 12px; border-left: 4px solid var(--brand); }
h3 { font-size: 15px; font-weight: 700; color: var(--text); margin: 20px 0 8px; }
p { margin: 8px 0 10px; text-align: justify; }
.def { background: rgba(37,83,59,0.06); border-left: 4px solid var(--brand);
  padding: 10px 16px; margin: 12px 0; border-radius: 0 6px 6px 0; }
.note { background: rgba(194,109,44,0.08); border-left: 4px solid var(--accent);
  padding: 10px 16px; margin: 12px 0; border-radius: 0 6px 6px 0; font-size: 14px; }
table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
th { background: var(--brand-strong); color: #fff; padding: 8px 12px; text-align: left; }
td { padding: 7px 12px; border-bottom: 1px solid var(--line); }
.toc { background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
  padding: 16px 20px; margin: 24px 0; }
.toc h3 { margin: 0 0 8px; font-size: 14px; color: var(--muted); }
.toc ol { padding-left: 20px; }
.toc li { margin: 4px 0; font-size: 14px; }
.toc a { color: var(--brand); }
@media (max-width: 820px) {
  .topbar-inner { align-items: flex-start; flex-wrap: wrap; }
  .nav-toggle { display: inline-flex; }
  .nav-links { display: none; width: 100%; padding: 10px 0 4px;
    flex-direction: column; align-items: stretch; gap: 6px; }
  .topbar.is-open .nav-links { display: flex; }
  .nav-links a, .nav-item > a { padding: 12px 14px; border-radius: 16px;
    background: rgba(255,255,255,0.72); border: 1px solid var(--line); }
  .nav-item { flex-direction: column; align-items: stretch; }
  .nav-dropdown { position: static; border: none; box-shadow: none; display: none;
    background: rgba(37,83,59,0.04); }
  .page { padding: 24px 20px 40px; }
}
@media print { body { background: #fff; } .page { box-shadow: none; padding: 24px 36px; } }
</style>
</head>
<body>

<!-- ═══════════ NAVBAR ═══════════
     Uprav cesty níže podle složky:
     PMZS/ → same-dir: "8_statnice_okenni_funkce.html", cross-dir: "../MS/20_EMC.html", "../PaISR/statnice_freertos.html"
     MS/   → same-dir: "20_EMC.html",                  cross-dir: "../PMZS/8_statnice_okenni_funkce.html", "../PaISR/..."
     PaISR/ → same-dir: "statnice_freertos.html",       cross-dir: "../PMZS/8_...", "../MS/20_EMC.html"
-->
<header class="topbar" id="topbar">
  <div class="topbar-inner">
    <a class="brand" href="../index.html" aria-label="Hlavní stránka">
      <strong>Státnicové otázky</strong>
      <span>README a přehled vypracovaných HTML otázek</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Otevřít menu" id="navToggle">
      <span aria-hidden="true"></span>
    </button>
    <nav class="nav-links" id="site-nav">
      <a href="../index.html">Main</a>
      <a href="../index.html#otazky">Otázky</a>

      <div class="nav-item" id="nav-rs">
        <a href="../index.html#rs" class="nav-disabled">RS (1–7) <span class="nav-chevron">▼</span></a>
        <div class="nav-dropdown">
          <a href="../index.html#rs" class="nav-disabled">1. Syntéza spojitých regulačních...</a>
          <a href="../index.html#rs" class="nav-disabled">2. Praktické aspekty PID...</a>
          <a href="../index.html#rs" class="nav-disabled">3. Stavová regulace</a>
          <a href="../index.html#rs" class="nav-disabled">4. Rozvětvené a vícerozměrné...</a>
          <a href="../index.html#rs" class="nav-disabled">5. Syntéza nelineárních...</a>
          <a href="../index.html#rs" class="nav-disabled">6. Statická optimalizace</a>
          <a href="../index.html#rs" class="nav-disabled">7. Dynamická optimalizace</a>
        </div>
      </div>

      <div class="nav-item" id="nav-pmzs">
        <a href="../index.html#pmzs">PMZS (8–14) <span class="nav-chevron">▼</span></a>
        <div class="nav-dropdown">
          <!-- PMZS files: use filename only (same dir). Other dirs: use ../SLOŽKA/soubor.html -->
          <a href="{PATH_TO_PMZS}/8_statnice_okenni_funkce.html">8. Váhové okenní funkce</a>
          <a href="{PATH_TO_PMZS}/9_statnice_frekvencni.html">9. Analýzy diskrétního signálu</a>
          <a href="{PATH_TO_PMZS}/10_frekvencni_spektra_modulace.html">10. Frekvenční spektra...</a>
          <a href="{PATH_TO_PMZS}/11_Amplitudové analogové modulace, úhlové analogové modulace.html">11. Amplitudové modulace...</a>
          <a href="{PATH_TO_PMZS}/12_Systémy pro zpracování signálu.html">12. Systémy pro zpracování...</a>
          <a href="../index.html#pmzs" class="nav-disabled">13. Převod analogové...</a>
          <a href="../index.html#pmzs" class="nav-disabled">14. Digitální modulace</a>
        </div>
      </div>

      <div class="nav-item" id="nav-ms">
        <a href="../index.html#ms">MS (15–20) <span class="nav-chevron">▼</span></a>
        <div class="nav-dropdown">
          <a href="../index.html#ms" class="nav-disabled">15. Vlastnosti měřicího systému</a>
          <a href="../index.html#ms" class="nav-disabled">16. Příčiny chyb...</a>
          <a href="../index.html#ms" class="nav-disabled">17. Statistické parametry...</a>
          <a href="../index.html#ms" class="nav-disabled">18. Statické a dynamické...</a>
          <a href="{PATH_TO_MS}/19_Přehled základních typů drátových a bezdrátový.html">19. Drátové a bezdrátové sběrnice</a>
          <a href="{PATH_TO_MS}/20_EMC.html">20. EMC a kvalita signálu</a>
        </div>
      </div>

      <div class="nav-item" id="nav-paisr">
        <a href="../index.html#paisr">PaISR <span class="nav-chevron">▼</span></a>
        <div class="nav-dropdown">
          <a href="{PATH_TO_PAISR}/statnice_freertos.html">FreeRTOS</a>
          <a href="../index.html#paisr" class="nav-disabled">SWI</a>
          <a href="{PATH_TO_PAISR}/mobilni_platformy_statnice.html">Android</a>
        </div>
      </div>
    </nav>
  </div>
</header>

<!-- ═══════════ OBSAH STRÁNKY ═══════════ -->
<div class="page">

<h1>Otázka {ČÍSLO} – {NÁZEV}</h1>
<p class="subtitle">Stručný popis · NMgr. Řídicí a informační systémy 2026 · Zdroj: {PŘEDMĚT}</p>

<div class="toc">
  <h3>Obsah</h3>
  <ol>
    <li><a href="#s1">Sekce 1</a></li>
    <li><a href="#s2">Sekce 2</a></li>
  </ol>
</div>

<h2 id="s1">1. Sekce 1</h2>
<p>Obsah...</p>

<div class="def">Definice nebo klíčový pojem.</div>

<h2 id="s2">2. Sekce 2</h2>
<p>Obsah...</p>

<div class="note">Poznámka nebo tip k zapamatování.</div>

</div><!-- /.page -->

<script>
  const topbar = document.getElementById('topbar');
  const navToggle = document.getElementById('navToggle');
  const navItems = document.querySelectorAll('.nav-item');
  const navLinks = document.querySelectorAll('#site-nav > a');

  function setMenu(open) {
    topbar.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  }

  navToggle.addEventListener('click', () => setMenu(!topbar.classList.contains('is-open')));
  navLinks.forEach(l => l.addEventListener('click', () => setMenu(false)));

  navItems.forEach(item => {
    const link = item.querySelector('a:first-child');
    if (link) {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 820) {
          e.preventDefault();
          item.classList.toggle('is-open');
        }
      });
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item') && !e.target.closest('#navToggle'))
      navItems.forEach(i => i.classList.remove('is-open'));
  });
</script>
</body>
</html>
```

---

## Jak vyplnit cesty v šabloně (nahraď `{PATH_TO_*}`)

| Aktuální složka souboru | `{PATH_TO_PMZS}` | `{PATH_TO_MS}` | `{PATH_TO_PAISR}` |
|-------------------------|------------------|----------------|-------------------|
| `docs/PMZS/` | *(prázdné — jen název)* | `../MS` | `../PaISR` |
| `docs/MS/` | `../PMZS` | *(prázdné)* | `../PaISR` |
| `docs/PaISR/` | `../PMZS` | `../MS` | *(prázdné)* |
| `docs/RS/` | `../PMZS` | `../MS` | `../PaISR` |

Příklad pro soubor v `docs/PMZS/13_prevod_signalu.html`:
- `{PATH_TO_PMZS}` → smaž prefix, nech jen `8_statnice_okenni_funkce.html`
- `{PATH_TO_MS}` → `../MS`
- `{PATH_TO_PAISR}` → `../PaISR`

---

## Prompty pro AI asistenta

Níže jsou připravené instrukce, které stačí zkopírovat a dát asistentovi. Asistent nepotřebuje složité vysvětlování — přečte si tento soubor a ví co dělat.

### Přidat novou otázku

```
Přidej novou státnicovou otázku č. 13 (Metody převodu signálu) do docs/PMZS/.
Soubor pojmenuj 13_prevod_signalu.html.
Použij šablonu z COPILOT_INSTRUCTIONS.md.
Po vytvoření souboru spusť generate_index_nav.py nebo aktualizuj index.html a nav-links.js manuálně.
```

### Aktualizovat index a navbar po přidání souborů

```
Aktualizuj docs/index.html a docs/shared/nav-links.js podle souborů ve složkách PMZS/, MS/, PaISR/.
Spusť docs/scripts/generate_index_nav.py nebo proveď aktualizaci manuálně.
```

### Opravit navbary ve všech stránkách

```
Zkontroluj a oprav navbary ve všech HTML souborech v docs/PMZS/, docs/MS/, docs/PaISR/.
Všechny existující soubory musí mít v navbar dropdownu aktivní (ne nav-disabled) linky.
Cesty musí být relativní: ../index.html pro hlavní stránku, ../SLOŽKA/soubor.html pro cross-directory.
```

### Přesunout soubory do podsložek

```
Přesuň HTML soubory z docs/ do správných podsložek (PMZS/, MS/, PaISR/).
Po přesunu oprav všechny relativní cesty v hlavičkách stránek (index.html → ../index.html, shared/ → ../shared/).
Pak aktualizuj docs/index.html a docs/shared/nav-links.js.
```

---

## Pravidla pro konzistentní styl

- **Pozadí:** vždy gradient `radial-gradient(...), linear-gradient(180deg, var(--bg), var(--bg-alt))` — nikdy plain `#fafaf8`
- **Barva navbaru:** zelená (`var(--brand-strong)` = `#173627`) — nikdy modrá `#1a4a8a`
- **Navbar CSS:** buď inline v `<style>` (viz šablona výše), nebo `<link href="../shared/navbar-styles.css">`
- **Obsah:** obalený v `<div class="page">` s `max-width: 900px; background: #fff`
- **Scripts:** NEpřidávat `../shared/nav-links.js` do stránek v podsložkách (nav-links.js je jen pro index.html)
- **Pojmenování:** `{číslo}_{slug}.html` pro číslované otázky, `{slug}_statnice.html` pro PaISR

---

## Jak funguje generate_index_nav.py

Skript čte složky `PMZS/`, `MS/`, `PaISR/`, `RS/` a:

1. Z názvů souborů extrahuje číslo otázky (`8` z `8_statnice_okenni_funkce.html`)
2. Přepíše `docs/shared/nav-links.js` s aktuální mapou `"číslo" → "SLOŽKA/soubor.html"`
3. V `docs/index.html` najde markery `<!-- AUTO:PMZS-START -->` … `<!-- AUTO:PMZS-END -->` a nahradí obsah vygenerovanými kartami (titulky bere z `<h1>` a prvního `<p>` každé stránky)

Markery jsou v `index.html` — **nemazat je**.
