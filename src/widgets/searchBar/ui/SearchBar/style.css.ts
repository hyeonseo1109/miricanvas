import { style } from "@vanilla-extract/css";

export const searchBarContainer = style({
  width: "100%",
  height: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.3rem",
});

export const searchContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flexShrink: 0,
  gap: "0.2rem",
});
