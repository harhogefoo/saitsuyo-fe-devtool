var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')

// setting : paths
var paths = {
  'scss': './assets/sass/',
  'css': './public/css/',
  'pug': './assets/pug/',
  'html': './public/'
}

// setting : Sass Options
var sassOptions = {
  outputStyle: 'compressed'
}

// setting : Pug Options
var pugOptions = {
  pretty: true
}

gulp.task('pug', () => {
  // _ から始まるファイルはコンパイル対象外。インクルード用のファイルのため
  return gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html))
})

// Sass
gulp.task('sass', function() {
  gulp.src(paths.scss + '**/*.scss')
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.css))
})

gulp.task('watch', function() {
  gulp.watch(paths.scss + '**/*.scss', ['sass'])
})
gulp.task('default', ['pug', 'sass'])
