import { AllResultsButton } from "@entities/result/ui/AllResultsButton";
import { KoreanResultsButton } from "@entities/result/ui/KoreanResultsButton";

export const ResultsContainer = () => {
  return (
    <div>
      <AllResultsButton />
      <KoreanResultsButton />
    </div>
  );
};
