import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/sub": {
        target: "http://localhost:5174",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
});
