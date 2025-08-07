import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // 🛡️ Prevents SSR-related Clerk errors
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
