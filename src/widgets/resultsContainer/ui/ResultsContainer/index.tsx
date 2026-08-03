import { AllResultsButton } from "@entities/result/ui/AllResultsButton";
import { KoreanResultsButton } from "@entities/result/ui/KoreanResultsButton";
import * as styles from "./style.css";
import { ResultsText } from "@entities/result/ui/ResultsText";

export const ResultsContainer = ({ results }: { results: string | null }) => {
  return (
    <div className={styles.resultsContainer}>
      <AllResultsButton />
      <KoreanResultsButton />
      <ResultsText results={results} />
    </div>
  );
};
