let mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.setPublicPath('./')
    .sass('src/sass/popup.scss', 'dist/css')
    .postCss('src/css/tailwind.css', 'dist/css', [
        tailwindcss('tailwind.config.js'),
    ])
    .js('src/js/popup.js', 'dist/js').vue()
    .js('src/js/content.js', 'dist/js')
    .copy('src/images/', 'dist/images')
    .copy('src/manifest.json', 'dist/')
    .copy('src/popup.html', 'dist/')
    .options({
        processCssUrls: false
    });