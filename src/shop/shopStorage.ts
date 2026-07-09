/**
 * Persisted purchase-state: owned project ids + remaining gold.
 * Locale-independent (ids only).
 */
const STORAGE_KEY = "shopPurchases";

type PurchaseState = {
  ownedIds: string[];
  gold: number;
};

export function loadPurchaseState(fallbackGold: number): PurchaseState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ownedIds: [], gold: fallbackGold };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { ownedIds: [], gold: fallbackGold };
    }
    const { ownedIds, gold } = parsed as Record<string, unknown>;
    return {
      ownedIds: Array.isArray(ownedIds)
        ? ownedIds.filter((id): id is string => typeof id === "string")
        : [],
      gold: typeof gold === "number" ? gold : fallbackGold,
    };
  } catch {
    // blocked storage / corrupt JSON — start fresh, non-fatal
    return { ownedIds: [], gold: fallbackGold };
  }
}

export function savePurchaseState(state: PurchaseState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // private mode / quota — purchase state just won't persist
  }
}
