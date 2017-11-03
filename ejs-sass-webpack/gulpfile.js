const gulp = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')

const ejs = require('gulp-ejs')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')

const paths = {
  'html': './public/',
  'css': './public/css/',
  'in_js': './src/js/',
  'ejs': './src/ejs/',
  'scss': './src/scss/',
  'out_js': './public/js/',
}

const sassOptions = {
  outputStyle: 'expanded',
  errLogToConsole: false,
}

const webpackOptions = {
  entry: paths.in_js + 'main.js',
  output: {
    filename: paths.out_js + 'app.bundle.js',
  },
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

gulp.task('webpack', () => {
  return webpackStream(webpackOptions, webpack).pipe(gulp.dest(''))
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
  gulp.watch(paths.in_js + '**/*.js', ['webpack'])
})

gulp.task('default', ['ejs', 'sass', 'webpack', 'browser-sync', 'watch'])
