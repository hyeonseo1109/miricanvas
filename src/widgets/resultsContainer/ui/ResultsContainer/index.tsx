import { AllResultsButton } from "@entities/result/ui/AllResultsButton";
import { KoreanResultsButton } from "@entities/result/ui/KoreanResultsButton";
import * as styles from "./style.css";

export const ResultsContainer = () => {
  return (
    <div className={styles.resultsContainer}>
      <AllResultsButton />
      <KoreanResultsButton />
    </div>
  );
};
