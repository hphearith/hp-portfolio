import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { ja } from "./ja";

const STORAGE_KEY = "lang";

const saved =
  typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

i18n.use(initReactI18next).init({
  resources: { en, ja },
  lng: saved === "ja" ? "ja" : "en",
  fallbackLng: "en",
  interpolation: {
    // React already escapes; keep $ and ＊ etc. literal
    escapeValue: false,
  },
});

/** Keep <html lang> in sync so the :lang(ja) font rules apply. */
function syncDocumentLang(lng: string) {
  document.documentElement.lang = lng;
  document.title = i18n.t("seo.title");
}
syncDocumentLang(i18n.language);

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  syncDocumentLang(lng);
});

export default i18n;
