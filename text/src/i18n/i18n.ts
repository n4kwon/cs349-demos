// translation table types
interface I18nTranslations {
  [key: string]: string;
}

const debug = true;

export interface I18nTranslationTable {
  [key: string]: I18nTranslations;
}

export function initializeI18n(
  app: HTMLDivElement,
  translations: I18nTranslationTable,
  defaultLocal: string
) {
  // set locale of all elements with data-i18n attribute
  function setLocale(locale: string) {
    // good practice to update the page language type as well
    app.querySelector("html")?.setAttribute("lang", locale);

    // update all elements with data-i18n attribute
    app.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (key) {
        element.textContent = translations[locale][key];
      }
    });
  }

  // get default browser locale
  // (not the same as lang="en" in html)
  const browserLocale = navigator.language;

  // initialize locale to browser locale (if possible)
  try {
    setLocale(browserLocale);
  } catch (_) {
    console.warn(
      `No translation for '${browserLocale}', using '${defaultLocal}'`
    );
    setLocale(defaultLocal);
  }

  // setup the locale switcher
  const localSwitcher = app.querySelector(
    "[data-i18n-switcher]"
  ) as HTMLSelectElement;

  if (!localSwitcher) {
    console.warn("No locale switcher found in app");
    return;
  }

  localSwitcher.addEventListener("change", (_) => {
    if (debug) console.log(localSwitcher.value);
    setLocale(localSwitcher.value);
  });
}
