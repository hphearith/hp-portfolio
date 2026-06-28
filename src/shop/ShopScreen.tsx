import { useEffect, useReducer, useRef, useState } from "react";
import Frame from "../components/Frame";
import Heart from "./Heart";
import Typewriter from "./Typewriter";
import { useKeyboardNav } from "./useKeyboardNav";
import { playSfx, preloadSfx } from "../audio/sfx";
import {
  PROJECTS,
  STARTING_GOLD,
  ROOT_COMMANDS,
  GREETING,
} from "./items";
import { initialShopState, shopReducer, BUY_EXIT_INDEX } from "./shopReducer";
import "./shop.css";

export default function ShopScreen() {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);
  const [hasCharacter, setHasCharacter] = useState(true);

  useKeyboardNav(dispatch, !state.closed);

  // warm up audio once
  useEffect(() => {
    preloadSfx();
  }, []);

  // ---- SFX: react to state transitions ----
  const prevRoot = useRef(state.rootIndex);
  const prevItem = useRef(state.itemIndex);
  const prevConfirm = useRef(state.confirmYes);
  const prevPhase = useRef(state.phase);

  useEffect(() => {
    if (state.phase === "root" && state.rootIndex !== prevRoot.current) {
      playSfx("move");
    }
    prevRoot.current = state.rootIndex;
  }, [state.rootIndex, state.phase]);

  useEffect(() => {
    if (state.phase === "buy" && state.itemIndex !== prevItem.current) {
      playSfx("move");
    }
    prevItem.current = state.itemIndex;
  }, [state.itemIndex, state.phase]);

  useEffect(() => {
    if (state.phase === "confirm" && state.confirmYes !== prevConfirm.current) {
      playSfx("move");
    }
    prevConfirm.current = state.confirmYes;
  }, [state.confirmYes, state.phase]);

  useEffect(() => {
    if (state.phase !== prevPhase.current) {
      if (state.phase === "buy" || state.phase === "confirm") playSfx("select");
      if (state.phase === "dialog") playSfx("squeak");
      prevPhase.current = state.phase;
    }
  }, [state.phase]);

  // ---- Side effect: open the queued project link ----
  // Links are DISABLED for now (no real targets wired yet). When ready, set
  // LINKS_ENABLED = true and fill in real URLs in items.ts.
  const LINKS_ENABLED = false;
  useEffect(() => {
    if (state.linkToOpen) {
      if (LINKS_ENABLED) {
        window.open(state.linkToOpen, "_blank", "noopener,noreferrer");
      }
      dispatch({ type: "CLEAR_LINK" });
    }
  }, [state.linkToOpen]);

  // undefined when the heart is on the buy-list Exit row
  const selected = PROJECTS[state.itemIndex];
  const onBuyExit = state.itemIndex === BUY_EXIT_INDEX;

  // The info box pops up (and sits) whenever there's an item in context.
  const infoOpen =
    state.phase === "buy" ||
    state.phase === "confirm" ||
    (state.phase === "dialog" && state.dialogReturn === "buy");

  // tap-to-navigate (mobile + mouse): first tap points, second selects
  function tapItem(index: number) {
    if (state.phase !== "buy") return;
    if (state.itemIndex === index) dispatch({ type: "SELECT" });
    else dispatch({ type: "POINT_AT", index });
  }

  function tapRoot(index: number) {
    if (state.phase !== "root") return;
    if (state.rootIndex === index) dispatch({ type: "SELECT" });
    else dispatch({ type: "POINT_ROOT", index });
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

  // talk = single full-width box ("shoptalk"); buy-reaction = right box of "shopbuy"
  const talkMode = state.phase === "dialog" && state.dialogReturn === "root";
  const buyDialog = state.phase === "dialog" && state.dialogReturn === "buy";
  // buy-ish phases use the combined shopbuy1 frame + the sliding shopbuy2 box
  const buyish =
    state.phase === "buy" || state.phase === "confirm" || buyDialog;
  const showItemList = buyish;

  const dialogEl = (
    <div className="dialog-box" onClick={() => dispatch({ type: "ADVANCE" })}>
      <div aria-live="polite">
        <Typewriter text={state.dialog ?? ""} onChar={() => playSfx("squeak")} />
      </div>
      <div className="dialog-cue">[Z]</div>
    </div>
  );

  return (
    <div className="shop-grid">
      {/* Top half: full-width art layer (bg + optional character sprite). */}
      <div className="art-layer">
        {hasCharacter && (
          <img
            className="art-character"
            src="/sprites/character.png"
            alt="The shopkeeper"
            onError={() => setHasCharacter(false)}
          />
        )}
      </div>

      {/* Combined two-box bottom frame behind the item/command content:
          shopDTR at root, shopbuy1 in buy phase (its top-right holds the dock
          seam that shopbuy2 — the info box — slides up out of). */}
      {!talkMode && (
        <div
          className={`bottom-frame ${
            buyish ? "bottom-frame--buy" : "bottom-frame--root"
          }`}
        />
      )}

      {/* Top-right: item info — slides up on buy/confirm, sits, slides down at root.
          In buy phase it wears the bottomless shopbuy2 frame so it docks seamlessly. */}
      <Frame
        className={`panel info${infoOpen ? " info--open" : ""}${
          buyish ? " info--buyframe" : ""
        }`}
      >
        {selected ? (
          <>
            <div className="info-title">{selected.name}</div>
            <div className="info-blurb">{selected.blurb}</div>
            <div className="info-price">{selected.price}$</div>
          </>
        ) : (
          <>
            <div className="info-title">Exit</div>
            <div className="info-blurb">{"Leaveth this liste,\nworm."}</div>
          </>
        )}
      </Frame>

      {/* Talk = one full-width box spanning the bottom row ("shoptalk") */}
      {talkMode && <Frame className="panel talk-box">{dialogEl}</Frame>}

      {/* Left (wide) panel: greeting -> item list */}
      {!talkMode && (
      <Frame className="panel menu bare">
        {showItemList ? (
          <div className="item-list" role="menu" aria-label="Shop items">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className="item-row"
                role="menuitem"
                aria-current={state.itemIndex === i ? "true" : undefined}
                onClick={() => tapItem(i)}
              >
                <span className="item-cursor">
                  {state.itemIndex === i && state.phase === "buy" && <Heart />}
                </span>
                <span className="item-name">{p.name}</span>
                <span className="item-price">{p.price}$</span>
              </div>
            ))}
            {/* Exit row: backs out of the item list to the command menu */}
            <div
              className="item-row"
              role="menuitem"
              aria-current={onBuyExit ? "true" : undefined}
              onClick={() => tapItem(BUY_EXIT_INDEX)}
            >
              <span className="item-cursor">
                {onBuyExit && state.phase === "buy" && <Heart />}
              </span>
              <span className="item-name">Exit</span>
              <span className="item-price" />
            </div>
          </div>
        ) : (
          <div className="greeting font-fancy">{GREETING}</div>
        )}
      </Frame>
      )}

      {/* Right panel: commands (Buy/Talk/Exit) / Yes-No prompt / Rouxls reaction */}
      {!talkMode && (
      <Frame className="panel buy-panel bare">
        {state.phase === "confirm" ? (
          <div className="buy-text">
            <div>{`Buyeth for\n${selected.price}$ ?`}</div>
            <div
              className="confirm-option"
              role="button"
              onClick={() => tapConfirm(true)}
            >
              <span className="item-cursor">{state.confirmYes && <Heart />}</span>
              <span>Yes</span>
            </div>
            <div
              className="confirm-option"
              role="button"
              onClick={() => tapConfirm(false)}
            >
              <span className="item-cursor">{!state.confirmYes && <Heart />}</span>
              <span>No</span>
            </div>
          </div>
        ) : buyDialog ? (
          dialogEl
        ) : (
          <div className="cmd-list" role="menu" aria-label="Shop actions">
            {ROOT_COMMANDS.map((cmd, i) => (
              <div
                key={cmd}
                className="cmd-row"
                role="menuitem"
                aria-current={
                  state.phase === "root" && state.rootIndex === i
                    ? "true"
                    : undefined
                }
                onClick={() => tapRoot(i)}
              >
                <span className="item-cursor">
                  {state.phase === "root" && state.rootIndex === i && <Heart />}
                </span>
                <span>{cmd}</span>
              </div>
            ))}
          </div>
        )}
        <div className="buy-footer">
          <span className="gold">{STARTING_GOLD}$</span>
          <span className="space-count">Space: 12</span>
        </div>
      </Frame>
      )}
    </div>
  );
}
