const MIRICANVAS_API_URL =
  "https://api.miricanvas.com/designresource/api/d/element";

export interface MiricanvasElement {
  keywords?: string;
}

export interface MiricanvasResponse {
  data: {
    list: MiricanvasElement[];
  };
}

export const fetchMiricanvasResults = async (
  keyword: string,
): Promise<MiricanvasResponse> => {
  const params = new URLSearchParams({
    status: "ACTIVE",
    keyword,
    color: "",
    includePresetV2: "true",
    teamIdx: "20625677",
    page: "1",
    pageSize: "30",
    tier: "PREMIUM",
    domain: "production",
    language: "ko",
  });

  [
    "ILLUST",
    "BITMAP",
    "FIGURE",
    "LINE",
    "ANI",
    "FRAME",
    "PRESET_FRAME",
    "MOCKUP_GRID",
    "MOCKUP_TEXT",
    "CHART",
  ].forEach((type) => params.append("typeList", type));

  const response = await fetch(`${MIRICANVAS_API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`검색 요청에 실패했습니다. (${response.status})`);
  }

  return response.json() as Promise<MiricanvasResponse>;
};
