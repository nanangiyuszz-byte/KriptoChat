import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Mengecilkan ukuran file
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // Menghapus semua console.log agar tidak bisa di-debug orang
        drop_debugger: true,
      },
    },
    // Memecah kode menjadi potongan acak (Chunking)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});
