const { src, dest, series, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const gulpIf = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const imageMin = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const webp = require('gulp-webp');
const flatten = require('gulp-flatten');


const isDev = process.env.NODE_ENV === 'developement';

const stylesTask = () => {
  return src('src/styles/index.scss')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))

    .pipe(gulpIf(!isDev, postcss([
      autoprefixer(),
    ])))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(gulpIf(isDev, sourcemaps.write('dist/maps')))
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream())
};

const scriptTask = () => {
  return src([
    'src/scripts/inert.js',
    'src/scripts/menu.js',
    'src/scripts/projects.js',
    'src/scripts/to-do.js',
    'src/scripts/map.js',
  ])
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('index.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(gulpIf(isDev, sourcemaps.write('dist/maps')))
    .pipe(dest('dist/scripts'))
};

const htmlTask = () => {
  return src('src/*.html')
    .pipe(gulpIf(isDev, htmlMin({ collapseWhitespace: true })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const svgConfig = {
    mode: {
      stack: {
        sprite: '../sprite.svg',
      }
    }
  };

const svgSprites = () => {
  return src('src/assets/svg/**/*.svg',)
    .pipe(svgSprite(svgConfig))
    .pipe(dest('dist'))
};

const imageTask = () => {
  return src([
    'src/assets/img/**/*.*',
  ])
    .pipe(imageMin())
    .pipe(flatten())
    .pipe(dest('dist/img/jpg'))
};

const imgToWebpTask = () => {
  return src('src/assets/img/**/*.*')
    .pipe(webp())
    .pipe(flatten())
    .pipe(dest('dist/img/webp'))
};


const fontsTask = () => {
  return src('src/assets/fonts/**/*.*')
    .pipe(dest('dist/styles/fonts'))
};

const iconTask = () => {
  return src('src/assets/icons/**/*.*')
    .pipe(dest('dist/img/icons'))
};

function clean() {
  return del('dist');
};

const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    ui: {
      port: 5001,
    },
    port: 5000,
  });
};

watch('src/**/*.html', htmlTask);
watch('src/**/*.css', stylesTask);
watch('src/**/*.scss', stylesTask);
watch('src/**/*.js', scriptTask);
watch('src/assets/svg/**/*.svg', svgSprites);
watch('src/assets/img/*.*', imageTask);
watch('src/assets/fonts/*.*', fontsTask);
watch('src/assets/img/**/*.*', imgToWebpTask());
watch('src/assets/icons/**/*.*', iconTask());

exports.build = series(clean, parallel(htmlTask, stylesTask, scriptTask, svgSprites, fontsTask, imgToWebpTask, imageTask, iconTask));
exports.default = series(clean, parallel(htmlTask, stylesTask, scriptTask, svgSprites, fontsTask, imgToWebpTask, imageTask, serve, iconTask));
