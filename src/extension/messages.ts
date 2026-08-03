import type { MiricanvasResponse } from "@shared/api/miricanvas";

export const TOGGLE_FLOATING_PANEL = "TOGGLE_FLOATING_PANEL" as const;
export const SEARCH_KEYWORDS = "SEARCH_KEYWORDS" as const;

export interface ToggleFloatingPanelMessage {
  type: typeof TOGGLE_FLOATING_PANEL;
}

export interface SearchKeywordsMessage {
  type: typeof SEARCH_KEYWORDS;
  keyword: string;
}

export type ExtensionMessage =
  | ToggleFloatingPanelMessage
  | SearchKeywordsMessage;

export type SearchKeywordsResponse =
  | { ok: true; data: MiricanvasResponse }
  | { ok: false; error: string };
