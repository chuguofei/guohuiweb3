import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  return {
    server: {
      host: true,
      port: 8000,
    },
    resolve: {
      alias: [
        {
          find: '~/',
          replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.json', '.ts'],
    },
  };
});
