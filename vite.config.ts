import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Determine the base URL based on the environment
const getBase = () => {
  // In development mode, use root path
  if (process.env.NODE_ENV === 'development') {
    return '/';
  }
  // In production, you can customize this path as needed
  return '/erxur/';
};

export default defineConfig({
  base: getBase(),
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
