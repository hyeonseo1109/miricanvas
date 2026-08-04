import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "100%",
  height: "100%",
  border: "1px solid #0e0e0e",
  backgroundColor: "#e6e8e9",
  padding: "0.25rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0.25rem",
});

export const title = style({
  flexShrink: 0,
  fontSize: "0.68rem",
  fontWeight: 600,
});
