import $ from 'jquery';
import {Fancybox} from '@fancyapps/ui';

$(document).ready(function () {
   $("#app").html("Hello World");
});

Fancybox.bind("[data-fancybox]", {
   // Your custom options
});

console.log('test')
