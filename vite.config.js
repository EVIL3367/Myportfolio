// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/', // Set '/' for root domain deployment, or '/your-subfolder/' if deploying under a subpath
});
