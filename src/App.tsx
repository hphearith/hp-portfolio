import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ShopScreen from "./shop/ShopScreen";
import MuteButton from "./components/MuteButton";
import LanguageButton from "./components/LanguageButton";
import { startBgm } from "./audio/sfx";
import { PROJECTS } from "./shop/items";

const BASE_W = 960;
const BASE_H = 540;

export default function App() {
  const { t } = useTranslation();
  const stageRef = useRef<HTMLDivElement>(null);

  // Scale the fixed-resolution stage to fit the viewport (crisp pixels).
  useEffect(() => {
    function fit() {
      const scale = Math.min(
        window.innerWidth / BASE_W,
        window.innerHeight / BASE_H
      );
      stageRef.current?.style.setProperty("--scale", String(scale));
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Try to start the looping BGM immediately on landing. Browsers usually
  // block autoplay with sound until a user gesture, so we also retry on the
  // first interaction (pointer or key) — whichever lands first wins (startBgm
  // is a no-op once it's already playing).
  useEffect(() => {
    startBgm();
    function kick() {
      startBgm();
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    }
    window.addEventListener("pointerdown", kick);
    window.addEventListener("keydown", kick);
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
  }, []);

  return (
    <>
      <div className="stage" ref={stageRef}>
        <ShopScreen />
      </div>

      <LanguageButton />
      <MuteButton />

      {/* Real content for crawlers + screen readers (visually hidden). */}
      <section className="sr-only" aria-label={t("aria.portfolio")}>
        <h1>{t("seo.title")}</h1>
        <p>{t("seo.tagline")}</p>
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <a href={p.link}>{t(`projects.${p.id}.name`)}</a> —{" "}
              {t(`projects.${p.id}.blurb`).replace(/\n/g, " ")}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
