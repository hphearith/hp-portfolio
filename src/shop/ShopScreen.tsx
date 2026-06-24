import { useEffect, useReducer, useRef, useState } from "react";
import Frame from "../components/Frame";
import Heart from "./Heart";
import Typewriter from "./Typewriter";
import { useKeyboardNav } from "./useKeyboardNav";
import { playSfx, preloadSfx } from "../audio/sfx";
import { PROJECTS, STARTING_GOLD, EXIT_ID } from "./items";
import {
  EXIT_INDEX,
  initialShopState,
  shopReducer,
} from "./shopReducer";
import type { ShopState } from "./shopReducer";
import "./shop.css";

export default function ShopScreen() {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);
  const [hasPortrait, setHasPortrait] = useState(true);

  useKeyboardNav(dispatch, !state.closed);

  // warm up audio once
  useEffect(() => {
    preloadSfx();
  }, []);

  // ---- SFX: react to state transitions ----
  const prevIndex = useRef(state.itemIndex);
  const prevConfirm = useRef(state.confirmYes);
  const prevPhase = useRef(state.phase);

  useEffect(() => {
    if (state.phase === "browsing" && state.itemIndex !== prevIndex.current) {
      playSfx("move");
    }
    prevIndex.current = state.itemIndex;
  }, [state.itemIndex, state.phase]);

  useEffect(() => {
    if (state.phase === "confirm" && state.confirmYes !== prevConfirm.current) {
      playSfx("move");
    }
    prevConfirm.current = state.confirmYes;
  }, [state.confirmYes, state.phase]);

  useEffect(() => {
    if (state.phase !== prevPhase.current) {
      if (state.phase === "confirm") playSfx("select");
      if (state.phase === "dialog") playSfx("squeak");
      prevPhase.current = state.phase;
    }
  }, [state.phase]);

  // ---- Side effect: open the queued project link ----
  useEffect(() => {
    if (state.linkToOpen) {
      window.open(state.linkToOpen, "_blank", "noopener,noreferrer");
      dispatch({ type: "CLEAR_LINK" });
    }
  }, [state.linkToOpen]);

  // info-panel content tracks the highlighted row
  const onExitRow = state.itemIndex === EXIT_INDEX;
  const selected = onExitRow ? null : PROJECTS[state.itemIndex];

  // tap-to-navigate (mobile + mouse): first tap points, second selects
  function tapRow(index: number) {
    if (state.phase !== "browsing") return;
    if (state.itemIndex === index) {
      dispatch({ type: "SELECT" });
    } else {
      dispatch({ type: "POINT_AT", index });
    }
  }

  function tapConfirm(yes: boolean) {
    dispatch({ type: "SET_CONFIRM", yes });
    dispatch({ type: "SELECT" });
  }

  if (state.closed) {
    return (
      <div className="closed-overlay">
        <p>Thou hast left mine shoppe.</p>
        <button
          type="button"
          className="reopen-btn"
          onClick={() => dispatch({ type: "REOPEN" })}
        >
          Re-entereth
        </button>
      </div>
    );
  }

  return (
    <div className="shop-grid">
      {/* Top-left: portrait */}
      <Frame className="panel portrait">
        {hasPortrait ? (
          <img
            src="/sprites/rouxls.png"
            alt="The shopkeeper"
            onError={() => setHasPortrait(false)}
          />
        ) : (
          <span className="portrait-fallback">{"ROUXLS\nKAARD"}</span>
        )}
      </Frame>

      {/* Top-right: item info */}
      <Frame className="panel info">
        {selected ? (
          <>
            <div className="info-title">{selected.name}</div>
            <div className="info-blurb">{selected.blurb}</div>
            <div className="info-price">{selected.price}$</div>
          </>
        ) : (
          <>
            <div className="info-title">Exit</div>
            <div className="info-blurb">{"Leaveth this\nfine shoppe."}</div>
          </>
        )}
      </Frame>

      {/* Bottom-left: item list */}
      <Frame className="panel">
        <div className="item-list" role="menu" aria-label="Shop items">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="item-row"
              role="menuitem"
              aria-current={state.itemIndex === i ? "true" : undefined}
              onClick={() => tapRow(i)}
            >
              <span className="item-cursor">
                {state.itemIndex === i && state.phase === "browsing" && <Heart />}
              </span>
              <span className="item-name">{p.name}</span>
              <span className="item-price">{p.price}$</span>
            </div>
          ))}
          {/* Exit row */}
          <div
            key={EXIT_ID}
            className="item-row"
            role="menuitem"
            aria-current={onExitRow ? "true" : undefined}
            onClick={() => tapRow(EXIT_INDEX)}
          >
            <span className="item-cursor">
              {onExitRow && state.phase === "browsing" && <Heart />}
            </span>
            <span className="item-name">Exit</span>
            <span className="item-price" />
          </div>
        </div>
      </Frame>

      {/* Bottom-right: buy prompt / dialog */}
      <Frame className="panel buy-panel">
        <BuyPanelBody
          state={state}
          onConfirm={tapConfirm}
          onAdvance={() => dispatch({ type: "ADVANCE" })}
        />
        <div className="buy-footer">
          <span className="gold">{STARTING_GOLD}$</span>
          <span className="space-count">Space: 12</span>
        </div>
      </Frame>
    </div>
  );
}

function BuyPanelBody({
  state,
  onConfirm,
  onAdvance,
}: {
  state: ShopState;
  onConfirm: (yes: boolean) => void;
  onAdvance: () => void;
}) {
  if (state.phase === "confirm") {
    const project = PROJECTS[state.itemIndex];
    return (
      <div className="buy-text">
        <div>{`Buyeth for\n${project.price}$ ?`}</div>
        <div
          className="confirm-option"
          onClick={() => onConfirm(true)}
          role="button"
        >
          <span className="item-cursor">{state.confirmYes && <Heart />}</span>
          <span>Yes</span>
        </div>
        <div
          className="confirm-option"
          onClick={() => onConfirm(false)}
          role="button"
        >
          <span className="item-cursor">{!state.confirmYes && <Heart />}</span>
          <span>No</span>
        </div>
      </div>
    );
  }

  if (state.phase === "dialog" && state.dialog) {
    return (
      <div className="buy-text" onClick={onAdvance}>
        <div aria-live="polite">
          <Typewriter
            text={state.dialog}
            onChar={() => playSfx("squeak")}
          />
        </div>
        <div className="dialog-cue">[Z]</div>
      </div>
    );
  }

  // browsing
  return <div className="buy-text">{"What wouldst\nthou buyeth,\nworm?"}</div>;
}
