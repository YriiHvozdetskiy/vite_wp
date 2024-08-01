import {defineConfig} from 'vite';
import Inspect from 'vite-plugin-inspect';
import handlebars from 'vite-plugin-handlebars';
import {resolve} from 'path';
import fs from 'fs';

function getPagesInput() {
   const pagesDir = resolve(__dirname, 'pages');
   const pages = {};
   fs.readdirSync(pagesDir).forEach(file => {
      if (file.endsWith('.html')) {
         const name = file.replace(/\.html$/, '');
         pages[name] = resolve(pagesDir, file);
      }
   });
   return pages;
}

export default defineConfig(({command, mode}) => {
   const isProd = mode === 'production';

   return {
      plugins: [
         Inspect(),
         handlebars({
            partialDirectory: resolve(__dirname, 'src/templates'),
            helpers: {
               array: (...items) => items.slice(0, -1),
               hash: (context) => context.hash,
            },
            context: (pagePath) => ({
               companyName: 'Your Company Name',
               currentYear: new Date().getFullYear(),
            }),
         }),
      ],
      resolve: {
         alias: {
            '@': resolve(__dirname, 'src'),
         },
      },
      build: {
         outDir: resolve(__dirname, '../themes/project_name/dist'),
         emptyOutDir: true,
         rollupOptions: {
            input: {
               main: resolve(__dirname, 'main.js'),
               ...getPagesInput(),
            },
            output: {
               entryFileNames: `assets/[name]${isProd ? '' : ''}.js`,
               chunkFileNames: `assets/[name]${isProd ? '' : ''}.js`,
               assetFileNames: (assetInfo) => {
                  if (assetInfo.name.endsWith('.css')) {
                     return `assets/[name]${isProd ? '' : ''}[extname]`;
                  }
                  return `assets/[name][extname]`;
               }
            }
         },
         minify: isProd,
         cssMinify: isProd,
         sourcemap: !isProd,
      },
      server: {
         watch: {
            usePolling: true,
         },
         open: '/pages/dashboard.html',
      }
   }
});