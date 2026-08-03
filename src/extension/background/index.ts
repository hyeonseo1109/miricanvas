import { fetchMiricanvasResults } from "@shared/api/miricanvas";
import {
  SEARCH_KEYWORDS,
  TOGGLE_FLOATING_PANEL,
  type ExtensionMessage,
  type SearchKeywordsResponse,
} from "../messages";

const togglePanel = async (tab: chrome.tabs.Tab) => {
  if (tab.id === undefined) return;

  try {
    await chrome.tabs.sendMessage(tab.id, { type: TOGGLE_FLOATING_PANEL });
  } catch {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    } catch (error) {
      // chrome://, Chrome Web Store 등 스크립트 삽입이 금지된 페이지는 조용히 무시한다.
      console.info("이 페이지에서는 키워드 추출기를 열 수 없습니다.", error);
    }
  }
};

chrome.action.onClicked.addListener((tab) => {
  void togglePanel(tab);
});

chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    _sender,
    sendResponse: (response: SearchKeywordsResponse) => void,
  ) => {
    if (message.type !== SEARCH_KEYWORDS) return false;

    void fetchMiricanvasResults(message.keyword)
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error: unknown) =>
        sendResponse({
          ok: false,
          error:
            error instanceof Error
              ? error.message
              : "검색 중 오류가 발생했습니다.",
        }),
      );

    return true;
  },
);
