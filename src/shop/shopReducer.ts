import { PROJECTS } from "./items";

/** index of the synthetic "Exit" row (one past the last project) */
export const EXIT_INDEX = PROJECTS.length;
/** total selectable rows in the item list (projects + Exit) */
export const TOTAL_ROWS = PROJECTS.length + 1;

export type Phase = "browsing" | "confirm" | "dialog";

export type ShopState = {
  phase: Phase;
  /** highlighted row 0..EXIT_INDEX */
  itemIndex: number;
  /** in confirm phase: true = Yes highlighted, false = No */
  confirmYes: boolean;
  /** text currently typing out in the dialog box (null = none) */
  dialog: string | null;
  /** link queued to open when the dialog is dismissed */
  pendingLink: string | null;
  /** set for one tick when a link should actually be opened (side effect) */
  linkToOpen: string | null;
  /** true once the Exit row is chosen */
  closed: boolean;
};

export const initialShopState: ShopState = {
  phase: "browsing",
  itemIndex: 0,
  confirmYes: true,
  dialog: null,
  pendingLink: null,
  linkToOpen: null,
  closed: false,
};

export type ShopAction =
  | { type: "MOVE_UP" }
  | { type: "MOVE_DOWN" }
  | { type: "SELECT" }
  | { type: "CANCEL" }
  | { type: "ADVANCE" }
  | { type: "POINT_AT"; index: number }
  | { type: "SET_CONFIRM"; yes: boolean }
  | { type: "CLEAR_LINK" }
  | { type: "REOPEN" };

const wrap = (n: number, len: number) => ((n % len) + len) % len;

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "CLEAR_LINK":
      return { ...state, linkToOpen: null };

    case "REOPEN":
      return { ...initialShopState };

    case "MOVE_UP":
      if (state.phase === "browsing") {
        return { ...state, itemIndex: wrap(state.itemIndex - 1, TOTAL_ROWS) };
      }
      if (state.phase === "confirm") {
        return { ...state, confirmYes: !state.confirmYes };
      }
      return state;

    case "MOVE_DOWN":
      if (state.phase === "browsing") {
        return { ...state, itemIndex: wrap(state.itemIndex + 1, TOTAL_ROWS) };
      }
      if (state.phase === "confirm") {
        return { ...state, confirmYes: !state.confirmYes };
      }
      return state;

    case "POINT_AT":
      if (state.phase === "browsing" && action.index < TOTAL_ROWS) {
        return { ...state, itemIndex: action.index };
      }
      return state;

    case "SET_CONFIRM":
      if (state.phase === "confirm") {
        return { ...state, confirmYes: action.yes };
      }
      return state;

    case "SELECT":
      if (state.phase === "browsing") {
        if (state.itemIndex === EXIT_INDEX) {
          return { ...state, closed: true };
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
            dialog: project.buyLine,
            pendingLink: project.link,
          };
        }
        // "No" -> back to the list
        return { ...state, phase: "browsing" };
      }
      if (state.phase === "dialog") {
        // dismiss dialog, fire the queued link as a side effect
        return {
          ...state,
          phase: "browsing",
          dialog: null,
          pendingLink: null,
          linkToOpen: state.pendingLink,
        };
      }
      return state;

    case "ADVANCE":
      if (state.phase === "dialog") {
        return {
          ...state,
          phase: "browsing",
          dialog: null,
          pendingLink: null,
          linkToOpen: state.pendingLink,
        };
      }
      return state;

    case "CANCEL":
      if (state.phase === "confirm") {
        return { ...state, phase: "browsing" };
      }
      if (state.phase === "dialog") {
        return { ...state, phase: "browsing", dialog: null, pendingLink: null };
      }
      if (state.phase === "browsing" && state.itemIndex !== EXIT_INDEX) {
        // tapping cancel jumps the cursor to Exit, like RPG menus
        return { ...state, itemIndex: EXIT_INDEX };
      }
      return state;

    default:
      return state;
  }
}
