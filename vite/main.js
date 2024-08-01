// Styles
import "normalize.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "@/styles/scss/main.scss";

// JavaScript
import $ from 'jquery';

// Plugins
import {Fancybox} from '@fancyapps/ui';

import '@/js/test.js';
import '@/js/app.js';


$(document).ready(function () {
   $("#app").append("<p>Цей текст доданий за допомогою jQuery</p>");
});

Fancybox.bind("[data-fancybox]", {
   // Ваші користувацькі опції
});

console.log('Main script loaded');