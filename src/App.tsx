import { useEffect, useRef } from "react";
import ShopScreen from "./shop/ShopScreen";
import { PROJECTS } from "./shop/items";

const BASE_W = 960;
const BASE_H = 540;

export default function App() {
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

  return (
    <>
      <div className="stage" ref={stageRef}>
        <ShopScreen />
      </div>

      {/* Real content for crawlers + screen readers (visually hidden). */}
      <section className="sr-only" aria-label="Portfolio projects">
        <h1>Hearith — Developer Portfolio</h1>
        <p>
          A Deltarune-style portfolio shop. Each shop ware links to a real
          project.
        </p>
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <a href={p.link}>{p.name}</a> — {p.blurb.replace(/\n/g, " ")}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
