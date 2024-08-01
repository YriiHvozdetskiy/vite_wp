// Styles
import "normalize.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "@/styles/scss/main.scss";

// Plugins
import $ from 'jquery';
import {Fancybox} from '@fancyapps/ui';

// JavaScript
import '@/js/test.js';
import '@/js/app.js';

// import fonts explicitly for WP
// import.meta.glob([
//    '/src/fonts/*.woff',
//    '/src/fonts/*.woff2',
// ]);

$(document).ready(function () {
   $("#app").append("<p>Цей текст доданий за допомогою jQuery</p>");
});

Fancybox.bind("[data-fancybox]", {
   // Your custom options
});

console.log('Main script loaded');