import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ShopScreen from "./shop/ShopScreen";
import LoadingScreen from "./components/LoadingScreen";
import MuteButton from "./components/MuteButton";
import LanguageButton from "./components/LanguageButton";
import { startBgm } from "./audio/sfx";
import { PROJECTS } from "./shop/items";

const BASE_W = 960;
const BASE_H = 540;

export default function App() {
  const { t } = useTranslation();
  const stageRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

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

  // Browsers block audio with sound until a user gesture. The loading
  // screen's "Enter" button click IS that gesture, so BGM only starts then.
  function handleEnter() {
    startBgm();
    setEntered(true);
  }

  return (
    <>
      <div className="stage" ref={stageRef}>
        <ShopScreen />
        {!entered && <LoadingScreen onEnter={handleEnter} />}
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
