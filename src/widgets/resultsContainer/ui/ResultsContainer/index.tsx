import * as styles from "./style.css";
import { ResultsText } from "@entities/result/ui/ResultsText";

export const ResultsContainer = ({
  results,
  error,
}: {
  results: string | null;
  error: string | null;
}) => {
  return (
    <div className={styles.resultsContainer}>
      <ResultsText results={results} error={error} />
    </div>
  );
};
