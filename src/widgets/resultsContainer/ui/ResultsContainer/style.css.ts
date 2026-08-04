import { style } from "@vanilla-extract/css";

export const resultsContainer = style({
  display: "flex",
  minHeight: 0,
  width: "100%",
  flex: "0 1 auto",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "0.15rem",
  overflow: "auto",
  fontSize: "0.58rem",
});

export const errorMessage = style({
  color: "red",
  fontSize: "0.58rem",
});
