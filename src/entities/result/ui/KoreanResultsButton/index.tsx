import { TextButton } from "@shared/ui";

export const KoreanResultsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <TextButton
      text="한국어 키워드만 보기"
      onClick={() => {
        onClick();
      }}
    />
  );
};
