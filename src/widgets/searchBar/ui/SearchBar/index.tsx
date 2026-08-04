import { SearchButton, SearchInput } from "@entities/search/ui";
import * as styles from "./style.css";
import { useEffect, useState } from "react";
import { getResults } from "@widgets/resultsContainer/model";
import { AllResultsButton } from "@entities/result/ui/AllResultsButton";
import { KoreanResultsButton } from "@entities/result/ui/KoreanResultsButton";
import { copyResult } from "@entities/result/model";

type KeywordMode = "all" | "korean";

export const SearchBar = ({
  setResults,
  setError,
}: {
  setResults: (results: string | null) => void;
  setError: (error: string | null) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [keywordMode, setKeywordMode] = useState<KeywordMode>("korean");
  const [allKeywords, setAllKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (allKeywords.length === 0) {
      setResults(null);
      return;
    }

    const visibleKeywords =
      keywordMode === "korean"
        ? allKeywords.filter((keyword) => /[가-힣]/.test(keyword))
        : allKeywords;

    const finalResults = visibleKeywords.slice(0, 25).join(", ");

    if (!finalResults) {
      setResults(null);
      setError("표시할 키워드가 없습니다.");
      return;
    }

    setError(null);
    setResults(finalResults);
    void copyResult(finalResults).catch(() => {
      setError(
        "클립보드에 복사하지 못했습니다. 브라우저 권한을 확인해 주세요.",
      );
    });
  }, [keywordMode, allKeywords, setResults, setError]);

  const handleSearch = async () => {
    const trimmedSearchValue = searchValue.trim();

    if (!trimmedSearchValue) {
      setError("검색어를 입력해 주세요.");
      setResults(null);
      setAllKeywords([]);
      return;
    }

    try {
      setError(null);

      const results = await getResults(trimmedSearchValue);

      const keywords = [
        ...new Set(
          results?.data.list.flatMap((item) =>
            (item.keywords ?? "")
              .split("|")
              .map((keyword) => keyword.trim())
              .filter(Boolean),
          ) ?? [],
        ),
      ];

      if (keywords.length === 0) {
        setError("검색 결과가 없습니다.");
        setResults(null);
        setAllKeywords([]);
        return;
      }

      setAllKeywords(keywords as string[]);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "검색 중 오류가 발생했습니다.",
      );

      setResults(null);
      setAllKeywords([]);
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

      <div className={styles.modeButtonContainer}>
        <AllResultsButton
          onClick={() => {
            setKeywordMode("all");
          }}
        />
        <KoreanResultsButton
          onClick={() => {
            setKeywordMode("korean");
          }}
        />
      </div>
    </div>
  );
};
