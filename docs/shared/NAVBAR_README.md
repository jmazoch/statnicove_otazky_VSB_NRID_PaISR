# Unified Navbar System

## Overview

Všechny HTML stránky používají jednotný navbar načítaný ze shared injektoru, takže změny navigace stačí dělat na jednom místě.

## Struktura

```
docs/
├── shared/
│   ├── navbar-styles.css       # CSS styly pro navbar
│   ├── navbar-inject.js        # JavaScript pro injektování navbaru
│   ├── navbar-template.html    # HTML šablona navbaru (pro referenci)
│   └── nav-links.js            # Správa odkazů v dropdownech
├── 8_statnice_okenni_funkce.html
├── 9_statnice_frekvencni.html
├── 10_frekvencni_spektra_modulace.html
├── 12_Systémy pro zpracování signálu.html  # Nově přidán navbar
├── 20_EMC.html                  # Přidán toggle script
├── index.html
├── statnice_freertos.html
└── mobilni_platformy_statnice.html
```

## Co se změnilo

### 1. Vytvořené nové soubory
- `shared/navbar-styles.css` - CSS pro navbar
- `shared/navbar-inject.js` - centrální JavaScript injector pro všechny HTML stránky
- `shared/navbar-template.html` - HTML šablona (referenční)

### 2. Aktualizované HTML soubory
- Všechny HTML soubory v `docs/` - inline navbar skripty nahrazeny společným injektorem

### 3. Ostatní soubory
Tyto soubory již měly kompletní navbar s toggle skriptem:
- 8_statnice_okenni_funkce.html ✓
- 9_statnice_frekvencni.html ✓
- 10_frekvencni_spektra_modulace.html ✓
- statnice_freertos.html ✓
- mobilni_platformy_statnice.html ✓
- index.html ✓

## Jak přidat novou otázku

Pokud budete přidávat nový HTML soubor s otázkou:

1. **Přidejte navbar CSS link** do `<head>`:
   ```html
   <link rel="stylesheet" href="shared/navbar-styles.css">
   ```

2. **Přidejte navbar HTML** hned po `<body>`:
   ```html
   <body>
   <header class="topbar" id="topbar">
     <!-- Navbar HTML z shared/navbar-template.html -->
   </header>
   ```

3. **Aktualizujte navbar links** pokud máte nový link:
   - Přidejte nový `<a href="your-file.html">` do příslušného `<div class="nav-dropdown">`

4. **Přidejte toggle script** před `</body>`:
   ```html
   <script>
     // Mobile menu toggle - copy z existujícího souboru nebo z navbar-inject.js
   </script>
   </body>
   ```

## Mobile responsivita

Navbar se automaticky přizpůsobí mobilním zařízením:
- Na obrazovkách ≤820px se zobrazí hamburger menu
- Kliknutí na tlačítko otevře/zavře menu
- Kliknutí na odkaz zavře menu

## Údržba

Pokud budete chtít změnit navbar na všech stránkách:

1. Upravte `shared/navbar-inject.js` a případně `shared/navbar-styles.css`
2. Pokud se mění položky v dropdownu, upravte také `shared/nav-links.js`
3. `shared/navbar-template.html` používejte jen jako referenční šablonu

## Reference

- Hlavní styling: `shared/navbar-styles.css`
- Link management: `shared/nav-links.js` (spravuje aktivní/neaktivní linky)
- Mobile toggle: `shared/navbar-inject.js` připojuje chování pro celé menu
