import * as styles from "./style.css";
import { ResultsText } from "@entities/result/ui/ResultsText";
import type { KeywordResults } from "@entities/result/model";

export const ResultsContainer = ({
  results,
  error,
}: {
  results: KeywordResults | null;
  error: string | null;
}) => {
  return (
    <div className={styles.resultsContainer}>
      <ResultsText results={results} error={error} />
    </div>
  );
};
