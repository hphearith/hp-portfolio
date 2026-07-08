import { PROJECTS, ROOT_COMMANDS, CMD_BUY, CMD_TALK, TALK_EXIT_INDEX, TALK_ROWS } from "./items";

/** number of project rows in the buy list */
export const ITEM_COUNT = PROJECTS.length;
/** synthetic "Exit" row at the bottom of the buy list (backs out to root) */
export const BUY_EXIT_INDEX = ITEM_COUNT;
/** total selectable rows in the buy list (projects + Exit) */
export const BUY_ROWS = ITEM_COUNT + 1;
/** number of root command rows (Buy / Talk / Exit) */
export const ROOT_COUNT = ROOT_COMMANDS.length;

/**
 * Two-level shop, Deltarune-style:
 *   root    -> heart on the right command menu (Buy / Talk / Exit)
 *   buy     -> heart in the left item list (info box pops up + sits)
 *   confirm -> Yes / No on the right
 *   dialog  -> Rouxls typewriter line; returns to where it came from
 *   talk    -> conversation topic menu (About yourself / experience / etc.)
 */
export type Phase = "root" | "buy" | "confirm" | "dialog" | "talk";

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
  /** true once Exit is chosen */
  closed: boolean;
  /** false while dialog text is typing; true once revealed or skipped */
  dialogReady: boolean;
  /** highlighted talk topic 0..TALK_EXIT_INDEX (talk phase) */
  talkIndex: number;
  /** bumped on every committed menu selection — drives the "select" sfx */
  selectTick: number;
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
  closed: false,
  dialogReady: true,
  talkIndex: 0,
  selectTick: 0,
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
  | { type: "SET_CONFIRM"; yes: boolean }
  | { type: "CLEAR_LINK" }
  | { type: "REOPEN" }
  | { type: "DIALOG_SKIP" };

const wrap = (n: number, len: number) => ((n % len) + len) % len;

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "CLEAR_LINK":
      return { ...state, linkToOpen: null };

    case "REOPEN":
      return { ...initialShopState };

    case "MOVE_UP":
      if (state.phase === "root") {
        return { ...state, rootIndex: wrap(state.rootIndex - 1, ROOT_COUNT) };
      }
      if (state.phase === "buy") {
        return { ...state, itemIndex: wrap(state.itemIndex - 1, BUY_ROWS) };
      }
      if (state.phase === "confirm") {
        return { ...state, confirmYes: !state.confirmYes };
      }
      if (state.phase === "talk") {
        return { ...state, talkIndex: wrap(state.talkIndex - 1, TALK_ROWS) };
      }
      return state;

    case "MOVE_DOWN":
      if (state.phase === "root") {
        return { ...state, rootIndex: wrap(state.rootIndex + 1, ROOT_COUNT) };
      }
      if (state.phase === "buy") {
        return { ...state, itemIndex: wrap(state.itemIndex + 1, BUY_ROWS) };
      }
      if (state.phase === "confirm") {
        return { ...state, confirmYes: !state.confirmYes };
      }
      if (state.phase === "talk") {
        return { ...state, talkIndex: wrap(state.talkIndex + 1, TALK_ROWS) };
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
      if (state.phase === "talk" && action.index < TALK_ROWS) {
        return { ...state, talkIndex: action.index };
      }
      return state;

    case "SET_CONFIRM":
      if (state.phase === "confirm") {
        return { ...state, confirmYes: action.yes };
      }
      return state;

    case "SELECT": {
      // Dialog advance/dismiss is not a menu selection — no "select" ding.
      if (state.phase === "dialog") {
        if (!state.dialogReady) {
          return { ...state, dialogReady: true };
        }
        return dismissDialog(state);
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
        return dismissDialog(state);
      }
      return state;

    case "DIALOG_SKIP":
      return { ...state, dialogReady: true };

    case "CANCEL":
      if (state.phase === "confirm") {
        return { ...state, phase: "buy" };
      }
      if (state.phase === "dialog") {
        return dismissDialog(state);
      }
      if (state.phase === "talk") {
        return { ...state, phase: "root" };
      }
      if (state.phase === "buy") {
        // back out of the item list to the root command menu
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
      return { ...state, phase: "talk", talkIndex: 0 };
    }
    // Exit
    return { ...state, closed: true };
  }
  if (state.phase === "buy") {
    // the Exit row at the bottom backs out to the root command menu
    if (state.itemIndex === BUY_EXIT_INDEX) {
      return { ...state, phase: "root" };
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
      };
    }
    // "No" -> back to the list
    return { ...state, phase: "buy" };
  }
  if (state.phase === "talk") {
    if (state.talkIndex === TALK_EXIT_INDEX) {
      return { ...state, phase: "root" };
    }
    return {
      ...state,
      phase: "dialog",
      dialog: `talk.topics.${state.talkIndex}.text`,
      dialogReturn: "talk",
      dialogReady: false,
    };
  }
  return state;
}

/** Leave the dialog box, returning to its origin and firing any queued link. */
function dismissDialog(state: ShopState): ShopState {
  return {
    ...state,
    phase: state.dialogReturn,
    dialog: null,
    pendingLink: null,
    linkToOpen: state.pendingLink,
    dialogReady: true,
  };
}
