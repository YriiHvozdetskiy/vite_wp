import {defineConfig} from 'vite';
import {resolve} from 'path';
import fs from 'fs';

import Inspect from 'vite-plugin-inspect';
import handlebars from 'vite-plugin-handlebars';
import {viteStaticCopy} from 'vite-plugin-static-copy';

export default defineConfig(({command, mode}) => {
   const isProd = mode === 'production';

   // Читаємо вміст папки pages
   const pagesDir = resolve(__dirname, 'pages');
   const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

   // Створюємо об'єкт input для rollupOptions
   const pagesInput = pageFiles.reduce((acc, file) => {
      const name = file.replace('.html', '');
      acc[name] = resolve(pagesDir, file);
      return acc;
   }, {});

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
         viteStaticCopy({
            targets: [
               {
                  src: 'src/assets/fonts/*',
                  dest: 'assets/fonts'
               },
               {
                  src: 'src/assets/images/*',
                  dest: 'images'
               }
            ]
         })
      ],
      resolve: {
         alias: {
            '@': resolve(__dirname, 'src'),
         },
      },
      build: {
         outDir: resolve(__dirname, '../themes/project_name/dist'),
         emptyOutDir: true,
         sourcemap: false,
         rollupOptions: {
            input: {
               main: resolve(__dirname, 'main.js'),
               ...pagesInput
            },
            output: {
               entryFileNames: 'assets/[name].js',
               chunkFileNames: 'assets/[name]-[hash].js',
               assetFileNames: (assetInfo) => {
                  if (assetInfo.name.endsWith('.css')) {
                     return 'assets/[name][extname]';
                  }
                  if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
                     return 'fonts/[name][extname]';
                  }
                  if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
                     return 'images/[name][extname]';
                  }
                  return 'assets/[name]-[hash][extname]';
               }
            }
         },
         minify: isProd,
         cssMinify: isProd,
         polyfillModulePreload: false,
      },
      server: {
         watch: {
            usePolling: true,
         }
      }
   }
});