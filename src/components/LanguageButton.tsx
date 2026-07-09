import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Fixed top-right EN/JA toggle, sitting left of the mute button.
 * Shows the language you'd switch TO, like the mute sprite shows the
 * action, not the state. Ctrl+J also toggles.
 */
export default function LanguageButton() {
  const { i18n, t } = useTranslation();
  const next = i18n.language === "ja" ? "en" : "ja";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        i18n.changeLanguage(i18n.language === "ja" ? "en" : "ja");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [i18n]);

  return (
    <button
      className="lang-btn"
      type="button"
      aria-label={t("aria.switchLang")}
      onClick={() => i18n.changeLanguage(next)}
    >
      {next === "ja" ? "あ" : "A"}
    </button>
  );
}
