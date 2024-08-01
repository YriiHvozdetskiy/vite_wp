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

export default defineConfig({
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
      rollupOptions: {
         input: getPagesInput(),
      },
   },
   server: {
      open: '/pages/dashboard.html',
   },
});