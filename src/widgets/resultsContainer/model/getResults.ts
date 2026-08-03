export const getResults = async (keyword: string) => {
  const response = await fetch(
    `https://api.miricanvas.com/designresource/api/d/element?status=ACTIVE&keyword=${encodeURIComponent(keyword)}&typeList=ILLUST&typeList=BITMAP&typeList=FIGURE&typeList=LINE&typeList=ANI&typeList=FRAME&typeList=PRESET_FRAME&typeList=MOCKUP_GRID&typeList=MOCKUP_TEXT&typeList=CHART&color=&includePresetV2=true&teamIdx=20625677&page=1&pageSize=30&tier=PREMIUM&domain=production&language=ko`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }
  const data = await response.json();
  console.log("data", data);
  return data;
};
