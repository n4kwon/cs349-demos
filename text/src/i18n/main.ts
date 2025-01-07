import html from "html-template-tag";
import { I18nTranslationTable, initializeI18n } from "./i18n";

// "create" a simple app
const app = document.querySelector("div#app") as HTMLDivElement;

// declarative method to create the app
// (note data-i18n-switcher and data-i18n attributes)
app.innerHTML = html`
  <select data-i18n-switcher class="locale-switcher">
    <option value="en-CA">English</option>
    <option value="fr-CA">Français</option>
    <option value="de">Deutsch</option>
  </select>
  <p data-i18n="welcome-msg">
    Welcome, please tell us about yourself.
  </p>
  <label data-i18n="label-name" for="name">Name</label>
  <input type="text" id="name" />
  <button data-i18n="button-submit" id="submit">Submit</button>
`;

// translation table
const translations = {
  "en-CA": {
    "welcome-msg": "Welcome, please tell us about yourself.",
    "label-name": "Name",
    "button-submit": "Submit",
  },
  "fr-CA": {
    "welcome-msg": "Bienvenue, parlez-nous de vous.",
    "label-name": "Nom",
    "button-submit": "Envoyer",
  },
  de: {
    "welcome-msg":
      "Willkommen, bitte erzählen Sie uns etwas über sich.",
    "label-name": "Name",
    "button-submit": "Senden",
  },
} as I18nTranslationTable;

// initialize i18n
initializeI18n(app, translations, "en-CA");
