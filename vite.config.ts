import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // GitHub Pages serves this repository under its project path, while
  // Vercel serves it from the domain root.
  const env = loadEnv(mode, ".", "");

  return {
    base: env.GITHUB_ACTIONS === "true" ? "/hp-portfolio/" : "/",
    plugins: [react()],
  };
});
