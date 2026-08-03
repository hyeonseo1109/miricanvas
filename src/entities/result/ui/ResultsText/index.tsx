export const ResultsText = ({
  results,
  error,
}: {
  results: string | null;
  error: string | null;
}) => {
  return (
    <div>
      {results}
      {error && <p>{error}</p>}
    </div>
  );
};
