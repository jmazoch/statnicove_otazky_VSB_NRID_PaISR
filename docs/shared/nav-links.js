(function () {
  const folderMatch = location.pathname.match(/\/(RS|PMZS|MS|PaISR)\//);
  const currentFolder = folderMatch ? folderMatch[1] : '';

  function toCurrentPageHref(path) {
    if (!currentFolder) {
      return path;
    }

    if (!path.includes('/')) {
      return '../' + path;
    }

    const parts = path.split('/');
    if (parts[0] === currentFolder) {
      return parts.slice(1).join('/');
    }

    return '../' + path;
  }

  const enabledByNumber = {
    "1": "RS/1_RS_synteza_spojitech_regulacnich_obvodu.html",
    "2": "RS/2_RS_prakticke_aspekty_pid_regulatoru.html",
    "3": "RS/3_RS_stavova_regulace.html",
    "4": "RS/4_RS_rozvetvene_a_vicerozmerne_regulacni_obvody.html",
    "5": "RS/5_RS_synteza_nelinearnich_r_o.html",
    "6": "RS/6_RS_staticka_optimalizace.html",
    "7": "RS/7_RS_dynamicka_optimalizace.html",
    "8": "PMZS/8_statnice_okenni_funkce.html",
    "9": "PMZS/9_statnice_frekvencni.html",
    "10": "PMZS/10_frekvencni_spektra_modulace.html",
    "11": "PMZS/11_Amplitudové analogové modulace, úhlové analogové modulace.html",
    "12": "PMZS/12_Systémy pro zpracování signálu.html",
    "13": "PMZS/13_prevody_PCM_PAM_PWM_PPM_PNM.html",
    "14": "PMZS/14_Digitální modulace signálu.html",
    "17": "MS/17_Statistické_parametry_měřícího_signálu.html",
    "18": "MS/18_Statické_a_dynamické_vlastnosti_MIS.html",
    "19": "MS/19_Přehled základních typů drátových a bezdrátový.html",
    "20": "MS/20_EMC.html"
  };

  const fallbackByNumber = {
    "15": "index.html#ms",
    "16": "index.html#ms"
  };

  const allAnchors = document.querySelectorAll(".nav-dropdown a");
  allAnchors.forEach((anchor) => {
    const text = (anchor.textContent || "").trim();
    const match = text.match(/^(\d+)\./);
    if (!match) {
      return;
    }

    const number = match[1];
    if (enabledByNumber[number]) {
      anchor.setAttribute("href", toCurrentPageHref(enabledByNumber[number]));
      anchor.classList.remove("nav-disabled");
      return;
    }

    if (fallbackByNumber[number]) {
      anchor.setAttribute("href", toCurrentPageHref(fallbackByNumber[number]));
      anchor.classList.add("nav-disabled");
    }
  });
})();
