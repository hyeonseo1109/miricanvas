import { SearchButton, SearchInput } from "@entities/search/ui";
import * as styles from "./style.css";
import { useState } from "react";
import { getResults } from "@widgets/resultsContainer/model";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string | null>("");

  const handleSearch = () => {
    getResults(searchValue?.trim() || "");
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
