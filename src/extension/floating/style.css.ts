import { style } from "@vanilla-extract/css";

export const panel = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  overflow: "hidden",
  border: "1px solid #b8bdc2",
  borderRadius: "12px",
  background: "#e6e8e9",
  boxShadow: "0 12px 36px rgba(0, 0, 0, 0.25)",
});

export const header = style({
  display: "flex",
  minHeight: "34px",
  padding: "0 8px 0 10px",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #c8ccd0",
  background: "#f5f6f7",
  cursor: "grab",
  fontSize: "12px",
  touchAction: "none",
  userSelect: "none",
  selectors: {
    "&:active": { cursor: "grabbing" },
  },
});

export const closeButton = style({
  display: "flex",
  width: "24px",
  height: "24px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  color: "#292929",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: 1,
  selectors: {
    "&:hover": { background: "#e1e3e5" },
    "&:focus-visible": { outline: "2px solid #4f46e5" },
  },
});

export const content = style({
  minHeight: 0,
  flex: 1,
  overflow: "auto",
});
