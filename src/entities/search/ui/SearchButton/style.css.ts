import { style } from "@vanilla-extract/css";

export const searchButton = style({
  width: "1.65rem",
  height: "1.65rem",
  textAlign: "center",
  justifyContent: "center",
  border: "1px solid #0e0e0e",
  backgroundColor: "#e9e6e6",
  borderRadius: "0.5rem",
  cursor: "pointer",
  fontSize: "0.7rem",
  ":hover": {
    backgroundColor: "#d3d3d3",
  },
});
