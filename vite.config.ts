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
        // {
        //   find: /^.*\/VPNavBar\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL(
        //       './.vitepress/vitepress/components/blog-navbar.vue',
        //       import.meta.url
        //     )
        //   ),
        // },
      ],
      extensions: ['.mjs', '.js', '.json', '.ts'],
    },
  };
});
