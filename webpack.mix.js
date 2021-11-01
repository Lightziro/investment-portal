const mix = require("laravel-mix");
mix.ts("resources/js/app.js", "public/js")
    .react()
    .sass("resources/sass/app.scss", "public/css");
