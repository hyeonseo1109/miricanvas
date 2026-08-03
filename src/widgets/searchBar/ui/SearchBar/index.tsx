import { SearchButton, SearchInput } from "@entities/search/ui";
import * as styles from "./style.css";
import { useState } from "react";
import { getResults } from "@widgets/resultsContainer/model";

export const SearchBar = ({
  setResults,
}: {
  setResults: (results: string | null) => void;
}) => {
  const [searchValue, setSearchValue] = useState<string | null>("");

  const handleSearch = async () => {
    console.log("searchValue", searchValue);
    const results = await getResults(searchValue?.trim() || "");
    console.log("results", results);
    const keyword = results?.data.list[0]?.originKeywords.split("|").join(", ");
    const secondKeyword = results?.data.list[1]?.originKeywords
      .split("|")
      .join(", ");

    console.log("keyword", keyword);
    console.log("secondKeyword", secondKeyword);
    setResults(keyword);
  };
  return (
    <div className={styles.searchBarContainer}>
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        onEnter={handleSearch}
      />
      <SearchButton onClick={handleSearch} />
    </div>
  );
};
