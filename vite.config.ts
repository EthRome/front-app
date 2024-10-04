import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr({
        include: '**/*.svg',
      }),
    ],
    server: {
      port: 5173,
    },
  };
});
