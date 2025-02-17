import * as path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: { chunkSizeWarningLimit: 1000 },
  resolve: {
    alias: [
      { find: "./runtimeConfig", replacement: "./runtimeConfig.browser" },
      {
        find: "~/",
        replacement: path.posix.join(__dirname, "src/"),
      },
    ],
  },
});
