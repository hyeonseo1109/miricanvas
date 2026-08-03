import {
  SEARCH_KEYWORDS,
  type SearchKeywordsResponse,
} from "@extension/messages";
import { fetchMiricanvasResults } from "@shared/api/miricanvas";

const isExtensionContext = () =>
  typeof chrome !== "undefined" && Boolean(chrome.runtime?.id);

export const getResults = async (keyword: string) => {
  if (!isExtensionContext()) {
    return fetchMiricanvasResults(keyword);
  }

  const response = (await chrome.runtime.sendMessage({
    type: SEARCH_KEYWORDS,
    keyword,
  })) as SearchKeywordsResponse;

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response.data;
};
