import {defineConfig} from 'vite';
import {resolve} from 'path';
import Inspect from 'vite-plugin-inspect';
import handlebars from 'vite-plugin-handlebars';
import {viteStaticCopy} from 'vite-plugin-static-copy';

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
         viteStaticCopy({
            targets: [
               {
                  src: 'src/assets/fonts/*',
                  dest: 'assets/fonts'
               },
               {
                  src: 'src/assets/images/*',
                  dest: 'assets/images'
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
         rollupOptions: {
            input: {
               main: resolve(__dirname, 'main.js'),
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
                     return 'assets/images/[name][extname]';
                  }
                  return 'assets/[name]-[hash][extname]';
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
         }
      }
   }
});