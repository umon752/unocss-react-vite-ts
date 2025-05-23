import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import UnoCSS from 'unocss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      configFile: './uno.config.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ 代表 src 資料夾
    },
  },
});
