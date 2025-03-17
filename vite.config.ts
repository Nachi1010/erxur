import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // תמיד משתמשים ב-base = '/' כדי שכל הנכסים יטענו מאותו מיקום
  base: '/erxur/',
  server: {
    host: "::",
    port: 8080,
    open: 'index-dev.html'
  },
  // בפרודקשן, זה יהיה index.html בתיקיית dist
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
