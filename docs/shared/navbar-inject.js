(function () {
  var isRoot = !['RS', 'PMZS', 'MS', 'PaISR'].some(function (dir) {
    return location.pathname.indexOf('/' + dir + '/') !== -1;
  });
  var base = isRoot ? '' : '../';

  function rootHref(path) {
    return base + path;
  }

  function sectionHref(section) {
    return isRoot ? '#' + section : base + 'index.html#' + section;
  }

  function questionHref(folder, file) {
    return base + folder + '/' + file;
  }

  if (!document.querySelector('link[href*="navbar-styles.css"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = rootHref('shared/navbar-styles.css');
    document.head.appendChild(link);
  }
  // countdown styles
  if (!document.querySelector('link[href*="navbar-countdown.css"]')) {
    var cdLink = document.createElement('link');
    cdLink.rel = 'stylesheet';
    cdLink.href = rootHref('shared/navbar-countdown.css');
    document.head.appendChild(cdLink);
  }

  var navbarHtml = [
    '<header class="topbar" id="topbar">',
    '  <div class="topbar-inner">',
    '    <a class="brand" href="' + rootHref('index.html') + '" aria-label="Hlavní stránka">',
    '      <strong>Státnicové otázky</strong>',
    '      <span>README a přehled vypracovaných HTML otázek</span>',
    '    </a>',
    '    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Otevřít menu" id="navToggle">',
    '      <span aria-hidden="true"></span>',
    '    </button>',
    '    <nav class="nav-links" id="site-nav">',
    '      <a href="' + rootHref('index.html') + '">Main</a>',
    '      <a href="' + sectionHref('otazky') + '">Otázky</a>',
    '      <div class="nav-item" id="nav-rs">',
    '        <a href="' + sectionHref('rs') + '">RS (1–7) <span class="nav-chevron">▼</span></a>',
    '        <div class="nav-dropdown">',
    '          <a href="' + questionHref('RS', '1_RS_synteza_spojitech_regulacnich_obvodu.html') + '">1. Syntéza spojitých regulačních...</a>',
    '          <a href="' + questionHref('RS', '2_RS_prakticke_aspekty_pid_regulatoru.html') + '">2. Praktické aspekty PID...</a>',
    '          <a href="' + questionHref('RS', '3_RS_stavova_regulace.html') + '">3. Stavová regulace</a>',
    '          <a href="' + questionHref('RS', '4_RS_rozvetvene_a_vicerozmerne_regulacni_obvody.html') + '">4. Rozvětvené a vícerozměrné...</a>',
    '          <a href="' + questionHref('RS', '5_RS_synteza_nelinearnich_r_o.html') + '">5. Syntéza nelineárních...</a>',
    '          <a href="' + questionHref('RS', '6_RS_staticka_optimalizace.html') + '">6. Statická optimalizace</a>',
    '          <a href="' + questionHref('RS', '7_RS_dynamicka_optimalizace.html') + '">7. Dynamická optimalizace</a>',
    '        </div>',
    '      </div>',
    '      <div class="nav-item" id="nav-pmzs">',
    '        <a href="' + sectionHref('pmzs') + '">PMZS (8–14) <span class="nav-chevron">▼</span></a>',
    '        <div class="nav-dropdown">',
    '          <a href="' + questionHref('PMZS', '8_statnice_okenni_funkce.html') + '">8. Váhové okenní funkce</a>',
    '          <a href="' + questionHref('PMZS', '9_statnice_frekvencni.html') + '">9. Analýzy diskrétního signálu</a>',
    '          <a href="' + questionHref('PMZS', '10_frekvencni_spektra_modulace.html') + '">10. Frekvenční spektra...</a>',
    '          <a href="' + questionHref('PMZS', '11_Amplitudové analogové modulace, úhlové analogové modulace.html') + '">11. Amplitudové a úhlové analogové modulace</a>',
    '          <a href="' + questionHref('PMZS', '12_Systémy pro zpracování signálu.html') + '">12. Systémy pro zpracování...</a>',
    '          <a href="' + questionHref('PMZS', '13_prevody_PCM_PAM_PWM_PPM_PNM.html') + '">13. Převod analogové...</a>',
    '          <a href="' + questionHref('PMZS', '14_Digitální modulace signálu.html') + '">14. Digitální modulace</a>',
    '        </div>',
    '      </div>',
    '      <div class="nav-item" id="nav-ms">',
    '        <a href="' + sectionHref('ms') + '">MS (15–20) <span class="nav-chevron">▼</span></a>',
    '        <div class="nav-dropdown">',
    '          <a href="' + questionHref('MS', '15_Obecné vlastnosti měřicího informačního systému.html') + '">15. Obecné vlastnosti MIS</a>',
    '          <a href="' + questionHref('MS', '16_priciny_vzniku_chyb_v_mericich_informacnich_systemech.html') + '">16. Příčiny chyb...</a>',
    '          <a href="' + questionHref('MS', '17_Statistické_parametry_měřícího_signálu.html') + '">17. Statistické parametry...</a>',
    '          <a href="' + questionHref('MS', '18_Statické_a_dynamické_vlastnosti_MIS.html') + '">18. Statické a dynamické...</a>',
    '          <a href="' + questionHref('MS', '19_Přehled základních typů drátových a bezdrátový.html') + '">19. Drátové a bezdrátové...</a>',
    '          <a href="' + questionHref('MS', '20_EMC.html') + '">20. EMC a kvalita signálu</a>',
    '        </div>',
    '      </div>',
    '      <div class="nav-item" id="nav-paisr">',
    '        <a href="' + sectionHref('paisr') + '">PaISR <span class="nav-chevron">▼</span></a>',
    '        <div class="nav-dropdown">',
    '          <a href="' + questionHref('PaISR', 'statnice_freertos.html') + '">FreeRTOS</a>',
    '          <a href="' + questionHref('PaISR', 'SW_Engineering.html') + '">SWI</a>',
    '          <a href="' + questionHref('PaISR', 'mobilni_platformy_statnice.html') + '">Android</a>',
    '        </div>',
    '      </div>',
    '    </nav>',
    '  </div>',
    '</header>'
  ].join('\n');

  var topbar = document.getElementById('topbar');
  if (topbar) {
    topbar.outerHTML = navbarHtml;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navbarHtml);
  }

  var insertedTopbar = document.getElementById('topbar');
  var navToggle = document.getElementById('navToggle');
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));

  function setMenu(open) {
    insertedTopbar.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  }

  navToggle.addEventListener('click', function () {
    setMenu(!insertedTopbar.classList.contains('is-open'));
  });

  document.querySelectorAll('#site-nav > a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  navItems.forEach(function (item) {
    var link = item.querySelector('a:first-child');
    if (!link) {
      return;
    }

    link.addEventListener('click', function (event) {
      if (window.innerWidth <= 820) {
        event.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.nav-item') && !event.target.closest('#navToggle')) {
      navItems.forEach(function (item) {
        item.classList.remove('is-open');
      });
    }
  });

  if (!document.querySelector('script[src*="nav-links.js"]')) {
    var script = document.createElement('script');
    script.defer = true;
    script.src = rootHref('shared/nav-links.js');
    document.head.appendChild(script);
  }
  // countdown script
  if (!document.querySelector('script[src*="navbar-countdown.js"]')) {
    var cdScript = document.createElement('script');
    cdScript.defer = true;
    cdScript.src = rootHref('shared/navbar-countdown.js');
    document.head.appendChild(cdScript);
  }
})();
