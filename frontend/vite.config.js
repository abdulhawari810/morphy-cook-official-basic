import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url"; // 1. Tambahkan import ini
import path from "path";

// 2. Buat manual __dirname yang aman untuk semua OS
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  resolve: {
    alias: {
      // 3. Ubah bagian ini agar menggunakan __dirname yang baru
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
