import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "100%",
  height: "100%",
  border: "1px solid #0e0e0e",
  backgroundColor: "#e6e8e9",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
});
