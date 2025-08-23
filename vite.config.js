// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Myportfolio/', // Set '/' for root domain deployment, or '/your-subfolder/' if deploying under a subpath
});
