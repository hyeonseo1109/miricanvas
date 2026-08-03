import { SearchBar } from "@widgets/searchBar/ui/SearchBar";
import * as styles from "./style.css";
import { ResultsContainer } from "@widgets/resultsContainer/ui";
import { useState } from "react";

export const Main = () => {
  const [results, setResults] = useState<string | null>("");
  return (
    <div className={styles.pageContainer}>
      <p>미리캔버스 인기요소 키워드 추출</p>
      <SearchBar setResults={setResults} />
      <ResultsContainer results={results} />
    </div>
  );
};
