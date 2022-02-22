import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import { join } from "path";
import { createHtmlPlugin } from "vite-plugin-html";

dotenv.config({ path: join(__dirname, ".env") });

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, "src/render"),
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          injectScript:
            process.env.NODE_ENV === "development"
              ? `<script src="http://localhost:8098"></script>`
              : "",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@render": join(__dirname, "src/render"),
      "@main": join(__dirname, "src/main"),
      "@common": join(__dirname, "src/common"),
    },
  },
  base: "./",
  build: {
    outDir: join(__dirname, "dist/render"),
    emptyOutDir: true,
  },
  server: {
    port: +process.env.PORT,
  },
  optimizeDeps: {
    include: [
      "@vueuse/core",
      "@vicons/ionicons5",
      "nanoid",
      "cos-js-sdk-v5",
      "indexeddb-export-import",
    ],
  },
});
