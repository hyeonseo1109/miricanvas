import { SearchButton, SearchInput } from "@entities/search/ui";
import * as styles from "./style.css";
import { useState } from "react";
import { getResults } from "@widgets/resultsContainer/model";
import {
  buildKeywordResults,
  copyResult,
  parseKeywords,
  type KeywordResults,
} from "@entities/result/model";

export const SearchBar = ({
  setResults,
  setError,
}: {
  setResults: (results: KeywordResults | null) => void;
  setError: (error: string | null) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const showResults = (groups: string[][]) => {
    const nextResults = buildKeywordResults(groups);
    const hasVisibleKeywords =
      Boolean(nextResults.combined) || nextResults.elements.some(Boolean);

    setResults(hasVisibleKeywords ? nextResults : null);

    if (!hasVisibleKeywords) {
      setError("표시할 키워드가 없습니다.");
      return;
    }

    setError(null);

    if (!nextResults.combined) return;

    void copyResult(nextResults.combined).catch(() => {
      setError(
        "클립보드에 복사하지 못했습니다. 브라우저 권한을 확인해 주세요.",
      );
    });
  };

  const handleSearch = async () => {
    const trimmedSearchValue = searchValue.trim();

    if (!trimmedSearchValue) {
      setError("검색어를 입력해 주세요.");
      setResults(null);
      return;
    }

    try {
      setError(null);

      const results = await getResults(trimmedSearchValue);

      const groups = Array.from({ length: 3 }, (_, index) =>
        parseKeywords(results.data.list[index]?.keywords),
      );

      if (!groups.some((keywords) => keywords.length > 0)) {
        setError("검색 결과가 없습니다.");
        setResults(null);
        return;
      }

      showResults(groups);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "검색 중 오류가 발생했습니다.",
      );

      setResults(null);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBarContainer}>
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          onEnter={handleSearch}
        />
        <SearchButton onClick={handleSearch} />
      </div>

    </div>
  );
};
