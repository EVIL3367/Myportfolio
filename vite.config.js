import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import mistralHandler from './api/ask-mistral.js';

// Simple Vite plugin to emulate Vercel serverless functions locally
function localApiPlugin() {
  return {
    name: 'local-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/ask-mistral', async (req, res, next) => {
        // We only mock the API endpoint we created
        if (req.method === 'OPTIONS' || req.method === 'POST') {
          // Provide JSON response methods manually for the middleware since it's a raw Node req/res
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          
          await mistralHandler(req, res);
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load env file for local Node environment
  const env = loadEnv(mode, process.cwd(), '');
  process.env.MISTRAL_API_KEY = env.MISTRAL_API_KEY || env.VITE_MISTRAL_API_KEY;

  return {
    plugins: [react(), localApiPlugin()],
    base: '/',
  };
});
