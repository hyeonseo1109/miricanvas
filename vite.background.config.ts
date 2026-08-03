import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    lib: {
      entry: resolve(projectRoot, "src/extension/background/index.ts"),
      formats: ["iife"],
      name: "MiricanvasKeywordBackground",
      fileName: () => "background.js",
    },
    outDir: "dist",
  },
});
