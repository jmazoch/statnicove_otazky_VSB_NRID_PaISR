COPILOT: Automatické aktualizace `index.html` a navbaru

Cíl
- Když přidáš HTML soubory do jedné z podsložek `docs/PMZS`, `docs/MS`, `docs/PaISR`, nebo `docs/RS`, spustíš generátor, který:
  - aktualizuje `docs/shared/nav-links.js` mapováním číselných otázek na příslušné cesty,
  - vygeneruje HTML kartu pro každou otázku a vloží ji do `docs/index.html` (mezi speciálními značkami),
  - nezmění obsah jednotlivých otázek.

Jak použít
1. Přesuň nebo vytvoř HTML soubory do jedné z podsložek: `docs/PMZS`, `docs/MS`, `docs/PaISR`, `docs/RS`.
2. Spusť generátor (z kořene repo):

```bash
python docs/scripts/generate_index_nav.py
```

3. Skript přepíše `docs/shared/nav-links.js` a aktualizuje sekce v `docs/index.html` pouze pokud jsou v indexu značky `<!-- AUTO:PMZS-START -->` / `<!-- AUTO:PMZS-END -->` (stejně pro `MS` a `PaISR`).

Poznámky pro Copilota (pokud chceš, aby asistent dělal tuto práci automaticky)
- Při žádosti napiš: "Zaktualizuj index a navbar podle souborů v `docs/`". Asistent spustí `docs/scripts/generate_index_nav.py` a nahradí `docs/shared/nav-links.js` a bloky v `docs/index.html`.
- Pokud budou potřeba přesuny souborů (migrace z kořene do podsložek), přidej v příkazu "proveď přesun" — asistent nejprve vytvoří zálohy, přesune soubory a opraví relativní cesty v hlavičkách stránek.

Bezpečnost a záloha
- Skript přepisuje `docs/shared/nav-links.js` a části `docs/index.html`. Udělá zálohu `docs/index.html.bak` před změnou, pokud je to potřeba.

Rozšíření
- Můžeš požádat o podporu dalších metadat (autor, datum, stručný popis) vytažených z hlaviček stránek a zobrazených v kartách v indexu.
