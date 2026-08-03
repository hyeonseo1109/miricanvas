export const ResultsText = ({ results }: { results: string | null }) => {
  return <div>{results ? results : <p>결과가 없습니다.</p>}</div>;
};
