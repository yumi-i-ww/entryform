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
// import * as path from "node:path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       "/api": {
//         target: "https://f04-contact.f02-nfc.teba-saki.net/dev",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
//   build: { chunkSizeWarningLimit: 1000 },
//   resolve: {
//     alias: [
//       { find: "./runtimeConfig", replacement: "./runtimeConfig.browser" },
//       {
//         find: "~/",
//         replacement: path.posix.join(__dirname, "src/"),
//       },
//     ],
//   },
// });
