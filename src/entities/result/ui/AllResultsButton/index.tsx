import { TextButton } from "@shared/ui";

export const AllResultsButton = ({ onClick }: { onClick: () => void }) => {
  return <TextButton text="전체 결과 보기" onClick={onClick} />;
};
