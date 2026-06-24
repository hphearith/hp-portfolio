import { useEffect } from "react";
import type { Dispatch } from "react";
import type { ShopAction } from "./shopReducer";

/**
 * Global keyboard handler for the shop menu.
 * Deltarune-style bindings: arrows/WS move, Z/Enter/Space confirm, X/Esc cancel.
 * preventDefault on arrows + space stops the page from scrolling.
 */
export function useKeyboardNav(
  dispatch: Dispatch<ShopAction>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    function onKey(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          dispatch({ type: "MOVE_UP" });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          dispatch({ type: "MOVE_DOWN" });
          break;
        case "Enter":
        case " ":
        case "z":
        case "Z":
          e.preventDefault();
          dispatch({ type: "SELECT" });
          break;
        case "Escape":
        case "x":
        case "X":
          e.preventDefault();
          dispatch({ type: "CANCEL" });
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch, enabled]);
}
