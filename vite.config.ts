import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// Relative base, damit die Seite unter jeder URL (GitHub Pages, lokal) funktioniert.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {outDir: 'build', emptyOutDir: true},
});
