import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://gainz-tracker-56ecdfa3c0f4.herokuapp.com/',
    },
  },
});
