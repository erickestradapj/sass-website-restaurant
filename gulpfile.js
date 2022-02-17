const { src, dest, watch, series } = require('gulp');

// CSS and SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css() {
   return (
      src('src/assets/scss/app.scss')
         .pipe(sourcemaps.init())
         .pipe(sass())
         // .pipe(postcss([autoprefixer(), cssnano()]))
         .pipe(postcss([autoprefixer()]))
         .pipe(sourcemaps.write('.'))
         .pipe(dest('build/css'))
   );
}

function images() {
   return src('src/assets/img/**/*')
      .pipe(
         imagemin({
            optimizationLevel: 3,
         })
      )
      .pipe(dest('build/img'));
}

function imagesWebp() {
   const options = {
      quality: 50,
   };

   return src('src/assets/img/**/*.{png,jpg}').pipe(webp(options)).pipe(dest('build/img'));
}

function imagesAvif() {
   const options = {
      quality: 50,
   };

   return src('src/assets/img/**/*.{png.jpg}').pipe(avif(options)).pipe(dest('build/img'));
}

function dev() {
   watch('src/assets/scss/**/*.scss', css);
   watch('src/assets/img/**/*', images);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.imagesWebp = imagesWebp;
exports.imagesAvif = imagesAvif;
exports.default = series(images, imagesWebp, imagesAvif, css, dev);
