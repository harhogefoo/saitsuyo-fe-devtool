const gulp = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')

const ejs = require('gulp-ejs')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')

const webpackConfig = require('./webpack.config')

// setting : paths
const paths = {
  'html': './public/',
  'css': './public/css/',
  'in-js': './src/js/',
  'ejs': './src/ejs/',
  'scss': './src/scss/',
  'out-js': './public/js/',
}

// setting : Sass Options
const sassOptions = {
  outputStyle: 'expanded',
  errLogToConsole: false,
}

gulp.task('ejs', () => {
  // _ から始まるファイルはコンパイル対象外。インクルード用のファイルのため
  gulp.src([paths.ejs + '**/*.ejs', '!' + paths.ejs + '**/_*.ejs'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(ejs({}, {}, {'ext': '.html'}))
    .pipe(gulp.dest(paths.html))
})

// Sass
gulp.task('sass', () => {
  gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
})

// Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    port: 8888,
    server: { baseDir: paths.html },
  })
  gulp.watch(paths.html + '**/*.html', ['reload'])
  gulp.watch(paths.css + '**/*.css', ['reload'])
})

gulp.task('reload', () => {
  browserSync.reload()
})

gulp.task('watch', () => {
  gulp.watch(paths.scss + '**/*.scss', ['sass'])
  gulp.watch([paths.ejs + '**/*.ejs', paths.ejs + '**/_*.ejs'], ['ejs'])
})

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(''))
})

gulp.task('default', ['ejs', 'sass', 'webpack', 'browser-sync', 'watch'])
// gulp.task('default', ['webpack'])
