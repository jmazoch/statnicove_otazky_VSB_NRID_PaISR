(function () {
  const enabledByNumber = {"8": "PMZS/8_statnice_okenni_funkce.html",
    "9": "PMZS/9_statnice_frekvencni.html",
    "10": "PMZS/10_frekvencni_spektra_modulace.html",
    "11": "PMZS/11_Amplitudové analogové modulace, úhlové analogové modulace.html",
    "12": "PMZS/12_Systémy pro zpracování signálu.html",
    "17": "MS/17_Statistické_parametry_měřícího_signálu.html",
    "18": "MS/18_Statické_a_dynamické_vlastnosti_MIS.html",
    "19": "MS/19_Přehled základních typů drátových a bezdrátový.html",
    "20": "MS/20_EMC.html"};

  const fallbackByNumber = {"1": "index.html#rs",
    "2": "index.html#rs",
    "3": "index.html#rs",
    "4": "index.html#rs",
    "5": "index.html#rs",
    "6": "index.html#rs",
    "7": "index.html#rs",
    "13": "index.html#pmzs",
    "14": "index.html#pmzs",
    "15": "index.html#ms",
    "16": "index.html#ms",
    "17": "index.html#ms",
    "18": "index.html#ms"};

  const allAnchors = document.querySelectorAll(".nav-dropdown a");
  allAnchors.forEach((anchor) => {
    const text = (anchor.textContent || "").trim();
    const match = text.match(/^(\d+)\./);
    if (!match) {
      return;
    }

    const number = match[1];
    if (enabledByNumber[number]) {
      anchor.setAttribute("href", enabledByNumber[number]);
      anchor.classList.remove("nav-disabled");
      return;
    }

    if (fallbackByNumber[number]) {
      anchor.setAttribute("href", fallbackByNumber[number]);
      anchor.classList.add("nav-disabled");
    }
  });
})();
