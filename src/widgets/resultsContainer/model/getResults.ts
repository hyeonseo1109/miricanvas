export const getResults = async (keyword: string) => {
  const response = await fetch(
    `https://api.example.com/results?keyword=${keyword}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }
  const data = await response.json();
  return data.results;
};
