(function () {
  const enabledByNumber = {
    "8": "8_statnice_okenni_funkce.html",
    "9": "9_statnice_frekvencni.html",
    "10": "10_frekvencni_spektra_modulace.html",
    "11": "11_Amplitudové analogové modulace, úhlové analogové modulace.html",
    "12": "12_Systémy pro zpracování signálu.html",
    "19": "19_Přehled základních typů drátových a bezdrátový.html",
    "20": "20_EMC.html"
  };

  const fallbackByNumber = {
    "1": "index.html#rs",
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
    "18": "index.html#ms"
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
