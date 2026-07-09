import { useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Frame from "../components/Frame";
import Heart from "./Heart";
import Typewriter from "./Typewriter";
import { useKeyboardNav } from "./useKeyboardNav";
import { playSfx, preloadSfx, isMuted, subscribeMuted } from "../audio/sfx";
import {
  PROJECTS,
  ROOT_COMMANDS,
  TALK_TOPIC_COUNT,
  TALK_EXIT_INDEX,
  TALK_ABOUT_INDEX,
  TALK_ABOUT_FACES,
  TALK_EXPERIENCE_INDEX,
  TALK_EXPERIENCE_FACES,
  TALK_EDUCATION_INDEX,
  TALK_EDUCATION_FACES,
} from "./items";
import type { Project } from "./items";
import { initialShopState, shopReducer, BUY_EXIT_INDEX } from "./shopReducer";
import type { ShopState } from "./shopReducer";
import "./shop.css";
import artbaseSprite from "../assets/sprites/artbase.png";
import handfoot1Sprite from "../assets/sprites/handfoot1.png";
import handfoot2Sprite from "../assets/sprites/handfoot2.png";
import handfoot3Sprite from "../assets/sprites/handfoot3.png";
import handfoot4Sprite from "../assets/sprites/handfoot4.png";
import facebaseSprite from "../assets/sprites/facebase.png";
import facehappySprite from "../assets/sprites/facehappy.png";
import facemlemSprite from "../assets/sprites/facemlem.png";
import faceneutralSprite from "../assets/sprites/faceneutral.png";
import facepoutSprite from "../assets/sprites/facepout.png";
import facesweatSprite from "../assets/sprites/facesweat.png";
import achmaSprite from "../assets/sprites/achma.png";
import claudeSprite from "../assets/sprites/claude.png";
import speaker1Sprite from "../assets/sprites/speaker1.png";
import speaker2Sprite from "../assets/sprites/speaker2.png";
import speaker3Sprite from "../assets/sprites/speaker3.png";
import steam1Sprite from "../assets/sprites/steam1.png";
import steam2Sprite from "../assets/sprites/steam2.png";

const HANDFOOT_SPRITES = [
  handfoot1Sprite,
  handfoot2Sprite,
  handfoot3Sprite,
  handfoot4Sprite,
];

const SPEAKER_SPRITES = [speaker1Sprite, speaker2Sprite, speaker3Sprite];

// Faces shown while a dialogue line is up (picked off the line's own i18n
// key so the same line always shows the same face). facebase.png is the
// idle default whenever no dialogue is active.
const DIALOG_FACE_SPRITES = [
  faceneutralSprite,
  facehappySprite,
  facemlemSprite,
  facepoutSprite,
];

function faceForDialog(dialogKey: string) {
  let hash = 0;
  for (let i = 0; i < dialogKey.length; i++) {
    hash = (hash * 31 + dialogKey.charCodeAt(i)) >>> 0;
  }
  return DIALOG_FACE_SPRITES[hash % DIALOG_FACE_SPRITES.length];
}

// "Tell me about yourself" and "About your experience" script a specific
// face per page instead of the hash-based pick above.
const FACE_SPRITE_BY_KEY: Record<
  | (typeof TALK_ABOUT_FACES)[number]
  | (typeof TALK_EXPERIENCE_FACES)[number]
  | (typeof TALK_EDUCATION_FACES)[number],
  string
> = {
  base: facebaseSprite,
  happy: facehappySprite,
  mlem: facemlemSprite,
  neutral: faceneutralSprite,
  sweat: facesweatSprite,
};

function faceForState(state: ShopState) {
  if (!state.dialog) return facebaseSprite;
  if (state.dialogReturn === "talk" && state.talkIndex === TALK_ABOUT_INDEX) {
    return FACE_SPRITE_BY_KEY[TALK_ABOUT_FACES[state.dialogPage] ?? "base"];
  }
  if (state.dialogReturn === "talk" && state.talkIndex === TALK_EXPERIENCE_INDEX) {
    return FACE_SPRITE_BY_KEY[TALK_EXPERIENCE_FACES[state.dialogPage] ?? "base"];
  }
  if (state.dialogReturn === "talk" && state.talkIndex === TALK_EDUCATION_INDEX) {
    return FACE_SPRITE_BY_KEY[TALK_EDUCATION_FACES[state.dialogPage] ?? "base"];
  }
  return faceForDialog(state.dialog);
}

export default function ShopScreen({ active = true }: { active?: boolean }) {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(shopReducer, initialShopState);
  const [greetingSkip, setGreetingSkip] = useState(false);
  const [muted, setMuted] = useState(isMuted());

  // speaker sprite freezes on speaker1 (no cycling) while music is muted
  // subscribeMuted may return a boolean; call it inside effect and ignore return
  useEffect(() => { subscribeMuted(setMuted); }, []);

  // input (keyboard + tap) is gated off while the loading screen sits on top,
  // so pressing Enter/Z/arrows there can't move or select anything underneath.
  useKeyboardNav(dispatch, active);

  // warm up audio once
  useEffect(() => {
    preloadSfx();
  }, []);

  // reset greeting typewriter when returning to root
  useEffect(() => {
    if (state.phase === "root") {
      setGreetingSkip(false);
    }
  }, [state.phase]);

  // ---- SFX: react to state transitions ----
  const prevRoot = useRef(state.rootIndex);
  const prevItem = useRef(state.itemIndex);
  const prevConfirm = useRef(state.confirmYes);
  const prevSelectTick = useRef(state.selectTick);
  const prevDialogPageTick = useRef(state.dialogPageTick);
  const prevItemsIndex = useRef(state.itemsIndex);
  const prevOwnedCount = useRef(state.ownedIds.length);

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
    if (state.phase === "items" && state.itemsIndex !== prevItemsIndex.current) {
      playSfx("move");
    }
    prevItemsIndex.current = state.itemsIndex;
  }, [state.itemsIndex, state.phase]);

  useEffect(() => {
    if (
      (state.phase === "confirm" || state.phase === "itemOpen") &&
      state.confirmYes !== prevConfirm.current
    ) {
      playSfx("move");
    }
    prevConfirm.current = state.confirmYes;
  }, [state.confirmYes, state.phase]);

  // "buy" jingle fires the moment a purchase actually lands (ownedIds grows).
  useEffect(() => {
    if (state.ownedIds.length > prevOwnedCount.current) {
      playSfx("buy");
    }
    prevOwnedCount.current = state.ownedIds.length;
  }, [state.ownedIds.length]);

  // "select" ding on every committed menu selection (Buy / Talk / Exit /
  // items / Yes / No / topics). The reducer bumps selectTick on each.
  useEffect(() => {
    if (state.selectTick !== prevSelectTick.current) {
      playSfx("select");
      prevSelectTick.current = state.selectTick;
    }
  }, [state.selectTick]);

  // "select" ding when a talk-topic dialog moves to its next page (not when
  // just skipping the current line's typing animation, and not on dismiss).
  useEffect(() => {
    if (state.dialogPageTick !== prevDialogPageTick.current) {
      playSfx("select");
      prevDialogPageTick.current = state.dialogPageTick;
    }
  }, [state.dialogPageTick]);

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

  // owned (purchased) projects shown on the Items screen
  const ownedProjects: Project[] = PROJECTS.filter((p) =>
    state.ownedIds.includes(p.id)
  );
  const onItemsExit = state.itemsIndex === ownedProjects.length;
  const selectedOwned = ownedProjects[state.itemsIndex];

  // tap-to-navigate (mobile + mouse): first tap points, second selects.
  // Every tap handler bails out while `active` is false (loading screen up).
  function tapItem(index: number) {
    if (!active || state.phase !== "buy") return;
    if (state.itemIndex === index) dispatch({ type: "SELECT" });
    else dispatch({ type: "POINT_AT", index });
  }

  function tapRoot(index: number) {
    if (!active || state.phase !== "root") return;
    if (state.rootIndex === index) dispatch({ type: "SELECT" });
    else dispatch({ type: "POINT_ROOT", index });
  }

  function tapConfirm(yes: boolean) {
    if (!active) return;
    dispatch({ type: "SET_CONFIRM", yes });
    dispatch({ type: "SELECT" });
  }

  function tapTalk(index: number) {
    if (!active || state.phase !== "talk") return;
    if (state.talkIndex === index) dispatch({ type: "SELECT" });
    else dispatch({ type: "POINT_TALK", index });
  }

  function tapItems(index: number) {
    if (!active || state.phase !== "items") return;
    if (state.itemsIndex === index) dispatch({ type: "SELECT" });
    else dispatch({ type: "POINT_ITEMS", index });
  }

  // talk = single full-width box ("shoptalk"); other phases use the two
  // side-by-side bottom boxes (item list + command/buy prompt).
  const talkMode =
    state.phase === "dialog" &&
    (state.dialogReturn === "root" || state.dialogReturn === "talk");
  const buyDialog = state.phase === "dialog" && state.dialogReturn === "buy";
  // buy-ish phases show the item list + the info box on top.
  const buyish =
    state.phase === "buy" || state.phase === "confirm" || buyDialog;
  // items-ish phases show the owned-items list + the info box on top.
  const itemsish = state.phase === "items" || state.phase === "itemOpen";
  const showItemList = buyish;

  // The info box pops up (and sits) whenever there's an item in context.
  const infoOpen = buyish || itemsish;
  const infoProject = buyish
    ? onBuyExit
      ? undefined
      : selected
    : itemsish
    ? onItemsExit
      ? undefined
      : selectedOwned
    : undefined;

  const dialogEl = (
    <div className="dialog-box" onClick={() => dispatch({ type: "ADVANCE" })}>
      <div className="dialog-text" aria-live="polite">
        {/* key: remount per dialog line so reveal state always starts fresh */}
        <Typewriter
          key={state.dialog ?? "idle"}
          text={state.dialog ? t(state.dialog) : ""}
          skip={state.dialogReady}
          onChar={() => playSfx("squeak")}
          onComplete={() => dispatch({ type: "DIALOG_SKIP" })}
        />
      </div>
      <div className="dialog-cue">[Z]</div>
    </div>
  );

  return (
    <div className="shop-grid">
      {/* Top half: full-width art layer (bg + shopkeeper sway animation).
          artbase = static linework; handfoot1-4 cut in/out on a fixed loop
          (timing lives in shop.css, --sway-loop). */}
      <div className="art-layer">
        <div className="art-stack">
          <img
            className="art-claude"
            src={claudeSprite}
            alt=""
            aria-hidden="true"
          />
          <img
            className="art-base"
            src={artbaseSprite}
            alt={t("aria.shopkeeper")}
          />
          <img
            className="art-face"
            src={faceForState(state)}
            alt=""
            aria-hidden="true"
          />
          {[1, 2, 3, 4].map((n) => (
            <img
              key={n}
              className={`art-frame art-frame--${n}`}
              src={HANDFOOT_SPRITES[n - 1]}
              alt=""
              aria-hidden="true"
            />
          ))}
          {[1, 2, 3].map((n) => (
            <img
              key={n}
              className={`art-frame art-speaker art-speaker--${n}${
                muted ? " art-speaker--muted" : ""
              }`}
              src={SPEAKER_SPRITES[n - 1]}
              alt=""
              aria-hidden="true"
            />
          ))}
          <div className="art-achma-wrap" aria-hidden="true">
            <img className="art-achma" src={achmaSprite} alt="" />
          </div>
          {/* "Flashy" glints popping beside the head (flash1/2.png,
              timing in shop.css .art-flash) */}
          <div className="art-flash art-flash--left" aria-hidden="true" />
          <div className="art-flash art-flash--right" aria-hidden="true" />
          {/* Steam wisps rising off the bread (steam1/steam2.png alternate,
              positions in artbase.png pixels x3'd, see .art-hotspot--bread) */}
          <img
            className="art-steam art-steam--1"
            src={steam1Sprite}
            alt=""
            aria-hidden="true"
          />
          <img
            className="art-steam art-steam--2"
            src={steam2Sprite}
            alt=""
            aria-hidden="true"
          />
          {/* Achma logo hotspot -> achma.site. Hitbox shown visibly (debug)
              until alignment's confirmed, then strip the background/border. */}
          <a
            className="art-hotspot art-hotspot--achma"
            href="https://achma.site/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Achma"
          />
          <a
            className="art-hotspot art-hotspot--bread"
            href="https://numpang-site.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bread"
          />
          <a
            className="art-hotspot art-hotspot--wine"
            href="https://nethphorntb.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Wine"
          />
          <a
            className="art-hotspot art-hotspot--moon"
            href="https://ngovkimyou.github.io/Moon---portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Moon"
          />
        </div>
      </div>

      {/* Top-right: item info box — appears on top in a buy context
          (shoptalk frame, no slide). */}
      <Frame
        className={`panel info${infoOpen ? " info--open" : ""}${
          buyish || itemsish ? " info--buyframe" : ""
        }`}
      >
        {infoProject ? (
          <>
            <div className="info-title">{t(`projects.${infoProject.id}.name`)}</div>
            <div className="info-blurb">{t(`projects.${infoProject.id}.blurb`)}</div>
            {buyish && <div className="info-price">{infoProject.price}$</div>}
          </>
        ) : (
          <>
            <div className="info-title">{t("info.exitTitle")}</div>
            <div className="info-blurb">{t("info.exitBlurb")}</div>
          </>
        )}
      </Frame>

      {/* Talk = one full-width box spanning the bottom row ("shoptalk") */}
      {talkMode && <Frame className="panel talk-box">{dialogEl}</Frame>}

      {/* Left (wide) panel: greeting -> item list -> talk topics */}
      {!talkMode && (
      <Frame className="panel menu">
        {showItemList ? (
          <div className="item-list" role="menu" aria-label={t("aria.shopItems")}>
            {PROJECTS.map((p, i) => {
              const owned = state.ownedIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  className={`item-row${owned ? " item-row--sold-out" : ""}`}
                  role="menuitem"
                  aria-current={state.itemIndex === i ? "true" : undefined}
                  aria-disabled={owned ? "true" : undefined}
                  onClick={() => tapItem(i)}
                >
                  <span className="item-cursor">
                    {state.itemIndex === i && state.phase === "buy" && <Heart />}
                  </span>
                  <span className="item-name">
                    {t(`projects.${p.id}.name`)}
                    {owned ? ` ${t("items.soldOut")}` : ""}
                  </span>
                  <span className="item-price">{p.price}$</span>
                </div>
              );
            })}
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
              <span className="item-name">{t("commands.exit")}</span>
              <span className="item-price" />
            </div>
          </div>
        ) : itemsish ? (
          <div className="item-list" role="menu" aria-label={t("aria.itemsList")}>
            {ownedProjects.length === 0 && (
              <div className="item-row item-row--empty">
                <span className="item-cursor" />
                <span className="item-name">{t("items.empty")}</span>
                <span className="item-price" />
              </div>
            )}
            {ownedProjects.map((p, i) => (
              <div
                key={p.id}
                className="item-row"
                role="menuitem"
                aria-current={state.itemsIndex === i ? "true" : undefined}
                onClick={() => tapItems(i)}
              >
                <span className="item-cursor">
                  {state.itemsIndex === i && state.phase === "items" && <Heart />}
                </span>
                <span className="item-name">{t(`projects.${p.id}.name`)}</span>
                <span className="item-price" />
              </div>
            ))}
            {/* Exit row: backs out of the items list to the command menu */}
            <div
              className="item-row"
              role="menuitem"
              aria-current={onItemsExit ? "true" : undefined}
              onClick={() => tapItems(ownedProjects.length)}
            >
              <span className="item-cursor">
                {onItemsExit && state.phase === "items" && <Heart />}
              </span>
              <span className="item-name">{t("commands.exit")}</span>
              <span className="item-price" />
            </div>
          </div>
        ) : state.phase === "talk" ? (
          <div className="item-list" role="menu" aria-label={t("aria.talkTopics")}>
            {Array.from({ length: TALK_TOPIC_COUNT }, (_, i) => (
              <div
                key={i}
                className="item-row"
                role="menuitem"
                aria-current={state.talkIndex === i ? "true" : undefined}
                onClick={() => tapTalk(i)}
              >
                <span className="item-cursor">
                  {state.talkIndex === i && <Heart />}
                </span>
                <span className="item-name">{t(`talk.topics.${i}.label`)}</span>
                <span className="item-price" />
              </div>
            ))}
            <div
              className="item-row"
              role="menuitem"
              aria-current={
                state.talkIndex === TALK_EXIT_INDEX ? "true" : undefined
              }
              onClick={() => tapTalk(TALK_EXIT_INDEX)}
            >
              <span className="item-cursor">
                {state.talkIndex === TALK_EXIT_INDEX && <Heart />}
              </span>
              <span className="item-name">{t("commands.exit")}</span>
              <span className="item-price" />
            </div>
          </div>
        ) : (
          <div
            className="greeting font-fancy"
            onClick={() => setGreetingSkip(true)}
          >
            <Typewriter
              text={t("greeting")}
              skip={greetingSkip}
              onChar={() => playSfx("squeak")}
            />
          </div>
        )}
      </Frame>
      )}

      {/* Right panel: commands (Buy/Talk/Exit) / Yes-No prompt / Rouxls reaction */}
      {!talkMode && (
      <Frame className="panel buy-panel">
        {state.phase === "confirm" ? (
          <div className="buy-text">
            <div>{t("confirm.prompt", { price: selected.price })}</div>
            <div
              className="confirm-option"
              role="button"
              onClick={() => tapConfirm(true)}
            >
              <span className="item-cursor">{state.confirmYes && <Heart />}</span>
              <span>{t("confirm.yes")}</span>
            </div>
            <div
              className="confirm-option"
              role="button"
              onClick={() => tapConfirm(false)}
            >
              <span className="item-cursor">{!state.confirmYes && <Heart />}</span>
              <span>{t("confirm.no")}</span>
            </div>
          </div>
        ) : state.phase === "itemOpen" ? (
          <div className="buy-text">
            <div>{t("items.openPrompt")}</div>
            <div
              className="confirm-option"
              role="button"
              onClick={() => tapConfirm(true)}
            >
              <span className="item-cursor">{state.confirmYes && <Heart />}</span>
              <span>{t("confirm.yes")}</span>
            </div>
            <div
              className="confirm-option"
              role="button"
              onClick={() => tapConfirm(false)}
            >
              <span className="item-cursor">{!state.confirmYes && <Heart />}</span>
              <span>{t("confirm.no")}</span>
            </div>
          </div>
        ) : buyDialog ? (
          dialogEl
        ) : (
          <div className="cmd-list" role="menu" aria-label={t("aria.shopActions")}>
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
                <span>{t(cmd)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="buy-footer">
          <span className="gold">{state.gold}$</span>
          <span className="space-count">{t("footer.space")}</span>
        </div>
      </Frame>
      )}
    </div>
  );
}
