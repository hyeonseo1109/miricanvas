import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  width: "100%",
  minHeight: 0,
  flexDirection: "column",
  gap: "0.2rem",
});

export const resultRow = style({
  display: "flex",
  width: "100%",
  minHeight: "1.75rem",
  padding: "0.2rem 0.3rem",
  alignItems: "center",
  gap: "0.25rem",
  border: "1px solid #c3c7ca",
  borderRadius: "0.35rem",
  background: "#f5f6f7",
});

export const resultContent = style({
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  flex: 1,
  flexDirection: "column",
  gap: "0.1rem",
});

export const label = style({
  fontSize: "0.56rem",
  lineHeight: 1.2,
});

export const keywordText = style({
  display: "block",
  width: "100%",
  maxWidth: "100%",
  paddingBottom: "0.12rem",
  overflowX: "auto",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  color: "#303236",
  fontSize: "0.55rem",
  lineHeight: 1.2,
});

export const copyButton = style({
  flexShrink: 0,
  padding: "0.14rem 0.32rem",
  border: "1px solid #74797e",
  borderRadius: "0.3rem",
  background: "#ffffff",
  cursor: "pointer",
  fontSize: "0.54rem",
  selectors: {
    "&:hover:not(:disabled)": { background: "#e4e7e9" },
    "&:focus-visible": { outline: "2px solid #4f46e5" },
    "&:disabled": { cursor: "not-allowed", opacity: 0.45 },
  },
});

export const error = style({
  color: "#b42318",
  fontSize: "0.56rem",
});

export const copyFeedback = style({
  color: "#246b36",
  fontSize: "0.54rem",
  textAlign: "right",
});

export const resultDivider = style({
  width: "100%",
  height: "1px",
  margin: "0.14rem 0",
  flexShrink: 0,
  background: "#7f858a",
});
