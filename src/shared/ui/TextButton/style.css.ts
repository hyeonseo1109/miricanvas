import { style } from "@vanilla-extract/css";

export const TextButton = style({
  border: "1px solid #0e0e0e",
  borderRadius: "0.5rem",
  padding: "0.1rem 0.45rem",
  width: "7.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "0.6rem",
  ":hover": {
    backgroundColor: "#d3d3d3",
  },
});
