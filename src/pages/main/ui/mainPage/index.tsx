import { SearchBar } from "@widgets/searchBar/ui/SearchBar";
import * as styles from "./style.css";
import { ResultsContainer } from "@widgets/resultsContainer/ui";

export const Main = () => {
  return (
    <div className={styles.pageContainer}>
      <p>미리캔버스 인기요소 키워드 추출</p>
      <SearchBar />
      <ResultsContainer />
    </div>
  );
};
