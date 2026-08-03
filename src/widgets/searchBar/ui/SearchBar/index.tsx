import { SearchButton, SearchInput } from "@entities/search/ui";
import * as styles from "./style.css";
import { useEffect, useState } from "react";
import { getResults } from "@widgets/resultsContainer/model";
import { AllResultsButton } from "@entities/result/ui/AllResultsButton";
import { KoreanResultsButton } from "@entities/result/ui/KoreanResultsButton";

type KeywordMode = "all" | "korean";

export const SearchBar = ({
  setResults,
}: {
  setResults: (results: string | null) => void;
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

    setResults(visibleKeywords.slice(0, 25).join(", "));
  }, [keywordMode, allKeywords, setResults]);

  const handleSearch = async () => {
    const results = await getResults(searchValue.trim());

    const keywords = [
      ...new Set(
        results?.data.list.flatMap((item: { originKeywords: string }) =>
          item.originKeywords
            .split("|")
            .map((keyword) => keyword.trim())
            .filter(Boolean),
        ) ?? [],
      ),
    ];

    setAllKeywords(keywords as string[]);
  };

  return (
    <div>
      <div className={styles.searchBarContainer}>
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          onEnter={handleSearch}
        />
        <SearchButton onClick={handleSearch} />
      </div>

      <div className={styles.modeButtonContainer}>
        <AllResultsButton onClick={() => setKeywordMode("all")} />
        <KoreanResultsButton onClick={() => setKeywordMode("korean")} />
      </div>
    </div>
  );
};
