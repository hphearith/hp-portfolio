import { PROJECTS, ROOT_COMMANDS, CMD_BUY, CMD_TALK, talkRowsFor, talkPageCount, TALK_MORE_ROW_INDEX, STARTING_GOLD } from "./items";
import type { Project } from "./items";

/** number of project rows in the buy list */
export const ITEM_COUNT = PROJECTS.length;
/** synthetic "Exit" row at the bottom of the buy list (backs out to root) */
export const BUY_EXIT_INDEX = ITEM_COUNT;
/** total selectable rows in the buy list (projects + Exit) */
export const BUY_ROWS = ITEM_COUNT + 1;
/** number of root command rows (Buy / Talk / Items) */
export const ROOT_COUNT = ROOT_COMMANDS.length;

/**
 * Two-level shop, Deltarune-style:
 *   root       -> heart on the right command menu (Buy / Talk / Items)
 *   buy        -> heart in the left item list (info box pops up + sits)
 *   confirm    -> Yes / No on the right (buying)
 *   dialog     -> Rouxls typewriter line; returns to where it came from
 *   talk       -> conversation topic menu (About yourself / experience / etc.)
 *   items      -> heart in the left list of owned (purchased) items
 *   itemOpen   -> Yes / No on the right ("Open?" — opening not wired up yet)
 */
export type Phase =
  | "root"
  | "buy"
  | "confirm"
  | "dialog"
  | "talk"
  | "items"
  | "itemOpen";

export type ShopState = {
  phase: Phase;
  /** highlighted command 0..ROOT_COUNT-1 (root phase) */
  rootIndex: number;
  /** highlighted item 0..ITEM_COUNT-1 (buy/confirm phase) */
  itemIndex: number;
  /** in confirm phase: true = Yes highlighted, false = No */
  confirmYes: boolean;
  /** i18n key of the text typing out in the dialog box (null = none) */
  dialog: string | null;
  /** phase to return to after a dialog is dismissed */
  dialogReturn: Phase;
  /** link queued to open when the dialog is dismissed */
  pendingLink: string | null;
  /** set for one tick when a link should actually be opened (side effect) */
  linkToOpen: string | null;
  /** false while dialog text is typing; true once revealed or skipped */
  dialogReady: boolean;
  /** current page 0..n within a multi-page talk topic dialog */
  dialogPage: number;
  /** bumped when a dialog moves to its next page (not on dismiss/skip) — drives the "select" sfx */
  dialogPageTick: number;
  /** highlighted row in the current talk-menu page (talk phase) */
  talkIndex: number;
  /** current talk-menu page: 0 = first, 1 = the "More..." page */
  talkPage: 0 | 1;
  /** topic index (into TALK_TOPICS / i18n talk.topics) of the open talk
      dialog — meaningful only while dialogReturn === "talk" */
  talkTopic: number;
  /** topic indices read to their final page (persisted to localStorage) */
  readTopics: number[];
  /** bumped on every committed menu selection — drives the "select" sfx */
  selectTick: number;
  /** ids of purchased projects (one stock each — sold out once bought) */
  ownedIds: string[];
  /** highlighted row 0..ownedIds.length in the items list (items phase) */
  itemsIndex: number;
  /** current gold, deducted on each purchase */
  gold: number;
  /** link of an owned "openDirect" project queued to open in a new tab */
  directLink: string | null;
};

export const initialShopState: ShopState = {
  phase: "root",
  rootIndex: CMD_BUY,
  itemIndex: 0,
  confirmYes: true,
  dialog: null,
  dialogReturn: "root",
  pendingLink: null,
  linkToOpen: null,
  dialogReady: true,
  dialogPage: 0,
  dialogPageTick: 0,
  talkIndex: 0,
  talkPage: 0,
  talkTopic: 0,
  readTopics: [],
  selectTick: 0,
  ownedIds: [],
  itemsIndex: 0,
  gold: STARTING_GOLD,
  directLink: null,
};

export type ShopAction =
  | { type: "MOVE_UP" }
  | { type: "MOVE_DOWN" }
  | { type: "SELECT" }
  | { type: "CANCEL" }
  | { type: "ADVANCE" }
  | { type: "POINT_ROOT"; index: number }
  | { type: "POINT_AT"; index: number }
  | { type: "POINT_TALK"; index: number }
  | { type: "POINT_ITEMS"; index: number }
  | { type: "SET_CONFIRM"; yes: boolean }
  | { type: "CLEAR_LINK" }
  | { type: "CLEAR_DIRECT_LINK" }
  | { type: "DIALOG_SKIP" };

const wrap = (n: number, len: number) => ((n % len) + len) % len;

/** owned projects in PROJECTS order — mirrors the Items-screen list in ShopScreen. */
function ownedProjects(state: ShopState): Project[] {
  return PROJECTS.filter((p) => state.ownedIds.includes(p.id));
}

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "CLEAR_LINK":
      return { ...state, linkToOpen: null };

    case "CLEAR_DIRECT_LINK":
      return { ...state, directLink: null };

    case "MOVE_UP":
      if (state.phase === "root") {
        return { ...state, rootIndex: wrap(state.rootIndex - 1, ROOT_COUNT) };
      }
      if (state.phase === "buy") {
        return { ...state, itemIndex: wrap(state.itemIndex - 1, BUY_ROWS) };
      }
      if (state.phase === "confirm" || state.phase === "itemOpen") {
        return { ...state, confirmYes: !state.confirmYes };
      }
      if (state.phase === "talk") {
        const rows = talkRowsFor(state.talkPage, state.readTopics).length;
        return { ...state, talkIndex: wrap(state.talkIndex - 1, rows) };
      }
      if (state.phase === "items") {
        const rows = state.ownedIds.length + 1;
        return { ...state, itemsIndex: wrap(state.itemsIndex - 1, rows) };
      }
      return state;

    case "MOVE_DOWN":
      if (state.phase === "root") {
        return { ...state, rootIndex: wrap(state.rootIndex + 1, ROOT_COUNT) };
      }
      if (state.phase === "buy") {
        return { ...state, itemIndex: wrap(state.itemIndex + 1, BUY_ROWS) };
      }
      if (state.phase === "confirm" || state.phase === "itemOpen") {
        return { ...state, confirmYes: !state.confirmYes };
      }
      if (state.phase === "talk") {
        const rows = talkRowsFor(state.talkPage, state.readTopics).length;
        return { ...state, talkIndex: wrap(state.talkIndex + 1, rows) };
      }
      if (state.phase === "items") {
        const rows = state.ownedIds.length + 1;
        return { ...state, itemsIndex: wrap(state.itemsIndex + 1, rows) };
      }
      return state;

    case "POINT_ROOT":
      if (state.phase === "root" && action.index < ROOT_COUNT) {
        return { ...state, rootIndex: action.index };
      }
      return state;

    case "POINT_AT":
      if (state.phase === "buy" && action.index < BUY_ROWS) {
        return { ...state, itemIndex: action.index };
      }
      return state;

    case "POINT_TALK":
      if (
        state.phase === "talk" &&
        action.index < talkRowsFor(state.talkPage, state.readTopics).length
      ) {
        return { ...state, talkIndex: action.index };
      }
      return state;

    case "POINT_ITEMS":
      if (state.phase === "items" && action.index < state.ownedIds.length + 1) {
        return { ...state, itemsIndex: action.index };
      }
      return state;

    case "SET_CONFIRM":
      if (state.phase === "confirm" || state.phase === "itemOpen") {
        return { ...state, confirmYes: action.yes };
      }
      return state;

    case "SELECT": {
      // Dialog advance/dismiss is not a menu selection — no "select" ding.
      if (state.phase === "dialog") {
        if (!state.dialogReady) {
          return { ...state, dialogReady: true };
        }
        return advanceOrDismissDialog(state);
      }
      const next = selectInMenu(state);
      // Only ding when the selection actually committed a choice.
      if (next === state) return state;
      return { ...next, selectTick: state.selectTick + 1 };
    }

    case "ADVANCE":
      if (state.phase === "dialog") {
        if (!state.dialogReady) {
          return { ...state, dialogReady: true };
        }
        return advanceOrDismissDialog(state);
      }
      return state;

    case "DIALOG_SKIP":
      return { ...state, dialogReady: true };

    case "CANCEL":
      if (state.phase === "confirm") {
        return { ...state, phase: "buy" };
      }
      if (state.phase === "itemOpen") {
        return { ...state, phase: "items" };
      }
      if (state.phase === "dialog") {
        return dismissDialog(state);
      }
      if (state.phase === "talk") {
        // Esc on the More... page backs up one page, not out of Talk.
        if (state.talkPage === 1) {
          return { ...state, talkPage: 0, talkIndex: TALK_MORE_ROW_INDEX };
        }
        return { ...state, phase: "root" };
      }
      if (state.phase === "buy") {
        // back out of the item list to the root command menu
        return { ...state, phase: "root" };
      }
      if (state.phase === "items") {
        return { ...state, phase: "root" };
      }
      return state;

    default:
      return state;
  }
}

/**
 * Resolve a SELECT in one of the menu phases (root/buy/confirm/talk).
 * Returns the unchanged state if nothing is selectable.
 */
function selectInMenu(state: ShopState): ShopState {
  if (state.phase === "root") {
    if (state.rootIndex === CMD_BUY) {
      return { ...state, phase: "buy", itemIndex: 0 };
    }
    if (state.rootIndex === CMD_TALK) {
      return { ...state, phase: "talk", talkIndex: 0, talkPage: 0 };
    }
    // Items
    return { ...state, phase: "items", itemsIndex: 0 };
  }
  if (state.phase === "buy") {
    // the Exit row at the bottom backs out to the root command menu
    if (state.itemIndex === BUY_EXIT_INDEX) {
      return { ...state, phase: "root" };
    }
    const project = PROJECTS[state.itemIndex];
    // sold out (one stock, already owned) or can't afford it — not selectable
    if (state.ownedIds.includes(project.id) || state.gold < project.price) {
      return state;
    }
    // open the buy prompt, default cursor on Yes
    return { ...state, phase: "confirm", confirmYes: true };
  }
  if (state.phase === "confirm") {
    if (state.confirmYes) {
      const project = PROJECTS[state.itemIndex];
      return {
        ...state,
        phase: "dialog",
        dialog: `projects.${project.id}.buyLine`,
        dialogReturn: "buy",
        pendingLink: project.link,
        dialogReady: false,
        ownedIds: [...state.ownedIds, project.id],
        gold: state.gold - project.price,
      };
    }
    // "No" -> back to the list
    return { ...state, phase: "buy" };
  }
  if (state.phase === "talk") {
    const row = talkRowsFor(state.talkPage, state.readTopics)[state.talkIndex];
    if (!row) return state;
    switch (row.kind) {
      case "exit":
        return { ...state, phase: "root" };
      case "more":
        return { ...state, talkPage: 1, talkIndex: 0 };
      case "back":
        // land back on the More... row the visitor came through
        return { ...state, talkPage: 0, talkIndex: TALK_MORE_ROW_INDEX };
      case "topic":
        return {
          ...state,
          phase: "dialog",
          dialog: `talk.topics.${row.topic}.pages.0`,
          dialogReturn: "talk",
          dialogReady: false,
          dialogPage: 0,
          talkTopic: row.topic,
        };
    }
  }
  if (state.phase === "items") {
    // the Exit row at the bottom backs out to the root command menu
    if (state.itemsIndex === state.ownedIds.length) {
      return { ...state, phase: "root" };
    }
    return { ...state, phase: "itemOpen", confirmYes: true };
  }
  if (state.phase === "itemOpen") {
    if (state.confirmYes) {
      const project = ownedProjects(state)[state.itemsIndex];
      if (project?.openDirect) {
        return { ...state, phase: "items", directLink: project.link };
      }
      // Other items aren't wired up to navigate away yet.
    }
    return { ...state, phase: "items" };
  }
  return state;
}

/**
 * On a committed dialog line: step to the next page of a talk topic, or
 * dismiss the dialog if this was the last (or only) page. Only the page
 * -> page step ("select" sfx) bumps dialogPageTick — dismissing does not.
 */
function advanceOrDismissDialog(state: ShopState): ShopState {
  const pageCount = talkPageCount(state.talkTopic);
  if (state.dialogReturn === "talk" && state.dialogPage < pageCount - 1) {
    const dialogPage = state.dialogPage + 1;
    return {
      ...state,
      dialog: `talk.topics.${state.talkTopic}.pages.${dialogPage}`,
      dialogPage,
      dialogReady: false,
      dialogPageTick: state.dialogPageTick + 1,
    };
  }
  return dismissDialog(state);
}

/** Leave the dialog box, returning to its origin and firing any queued link. */
function dismissDialog(state: ShopState): ShopState {
  // A talk topic dismissed from its final page counts as read (this also
  // covers Esc while the last page is up — CANCEL comes straight here).
  // The dialogReturn gate keeps buy dialogs away from readTopics.
  let readTopics = state.readTopics;
  if (
    state.dialogReturn === "talk" &&
    state.dialogPage >= talkPageCount(state.talkTopic) - 1 &&
    !readTopics.includes(state.talkTopic)
  ) {
    readTopics = [...readTopics, state.talkTopic];
  }
  return {
    ...state,
    readTopics,
    phase: state.dialogReturn,
    dialog: null,
    pendingLink: null,
    linkToOpen: state.pendingLink,
    dialogReady: true,
    dialogPage: 0,
  };
}
