import type { KeywordResults } from "./keywordResults";

export const parseKeywords = (keywords?: string) => [
  ...new Set(
    (keywords ?? "")
      .split("|")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
  ),
];

export const buildKeywordResults = (
  keywordGroups: string[][],
): KeywordResults => {
  const combined = [
    ...new Set([...(keywordGroups[0] ?? []), ...(keywordGroups[1] ?? [])]),
  ]
    .slice(0, 25)
    .join(", ");

  return {
    combined,
    elements: keywordGroups.map((keywords) => keywords.join(", ")),
  };
};
