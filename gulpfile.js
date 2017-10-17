var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync')

// setting : paths
var paths = {
  'scss': './assets/sass/',
  'css': './public/css/',
  'pug': './assets/pug/',
  'html': './public/'
}

// setting : Sass Options
var sassOptions = {
  outputStyle: 'compressed',
  errLogToConsole: false
}

// setting : Pug Options
var pugOptions = {
  pretty: true
}

gulp.task('pug', function() {
  // _ から始まるファイルはコンパイル対象外。インクルード用のファイルのため
  gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html))
})

// Sass
gulp.task('sass', function() {
  gulp.src(paths.scss + '**/*.scss')
   .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
   .pipe(sass(sassOptions))
   .pipe(autoprefixer())
   .pipe(gulp.dest(paths.css))
})

// Browser Sync
gulp.task('browser-sync', function() {
  browserSync({ server: { baseDir: paths.html } })
  gulp.watch(paths.html + "**/*.html", ['reload'])
  gulp.watch(paths.css + "**/*.css", ['reload'])
})

gulp.task('reload', function() {
  browserSync.reload()
})

gulp.task('watch', function() {
  gulp.watch(paths.scss + '**/*.scss', ['sass'])
  gulp.watch([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'], ['pug']);
})
gulp.task('default', ['browser-sync', 'watch'])
