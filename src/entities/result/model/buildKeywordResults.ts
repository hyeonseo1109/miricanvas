import type { KeywordResults } from "./keywordResults";

export type KeywordMode = "all" | "korean";

const KOREAN_PATTERN = /[가-힣]/;

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
  mode: KeywordMode,
): KeywordResults => {
  const visibleGroups = keywordGroups.map((keywords) =>
    mode === "korean"
      ? keywords.filter((keyword) => KOREAN_PATTERN.test(keyword))
      : keywords,
  );

  const combined = [
    ...new Set([...(visibleGroups[0] ?? []), ...(visibleGroups[1] ?? [])]),
  ]
    .slice(0, 25)
    .join(", ");

  return {
    combined,
    elements: visibleGroups.map((keywords) => keywords.join(", ")),
  };
};
