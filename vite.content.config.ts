import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react(), tsconfigPaths(), vanillaExtractPlugin()],
  build: {
    copyPublicDir: false,
    cssCodeSplit: false,
    emptyOutDir: false,
    lib: {
      entry: resolve(projectRoot, "src/extension/content/index.tsx"),
      formats: ["iife"],
      name: "MiricanvasKeywordContent",
      fileName: () => "content.js",
    },
    outDir: "dist",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "content.css"
            : "assets/[name][extname]",
      },
    },
  },
});
