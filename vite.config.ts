import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: 'so-me',
  plugins: [tailwindcss()],
});
