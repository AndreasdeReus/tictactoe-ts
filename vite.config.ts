import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom", 
    globals: true,
    coverage: { 
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: {
        lines: 85,
        branches: 80,
        functions: 85,
        statements: 85,
      }
   },
  },
});
