import * as styles from "./style.css";
import { ResultsText } from "@entities/result/ui/ResultsText";

export const ResultsContainer = ({ results }: { results: string | null }) => {
  return (
    <div className={styles.resultsContainer}>
      <ResultsText results={results} />
    </div>
  );
};
