const gulp = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const ejs = require('gulp-ejs')
const sass = require('gulp-sass')
const minifycss = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')
const packageImporter = require('node-sass-package-importer')

const gulpIf = require('gulp-if')
const minimist = require('minimist')

const paths = {
  'ejs': './src/',
  'scss': './src/',
  'in_js': './src/',
  'html': './public/',
  'css': './public/',
  'out_js': './public/',
}

const envSettings = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development',
  },
}

// 実行時の引数を取り込む
const options = minimist(process.argv.slice(2), envSettings)
const production = options.env === 'production'

const webpackPlugins = production ? [new webpack.optimize.UglifyJsPlugin()] : []
const config = {
  sassOptions: {
    outputStyle: 'expanded',
    errLogToConsole: false,
    importer: packageImporter({
      exetnsions: ['.scss', '.css'],
    }),
  },
  webpackOptions: {
    entry: {
      'ATS_001/js/index': paths.in_js + 'ATS_001/js/index.js',
      'ATS_002/js/index': paths.in_js + 'ATS_002/js/index.js',
    },
    output: {
      path: '/public',
      filename: '[name].bundle.js',
    },
    plugins: webpackPlugins,
    devtool: 'source-map',
  },
  envProduction: production,
}

gulp.task('ejs', () => {
  // _ から始まるファイルはコンパイル対象外。インクルード用のファイルのため
  gulp.src(
    [paths.ejs + '**/*.ejs', '!' + paths.ejs + '**/_*.ejs']
  ).pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(ejs({}, {}, {'ext': '.html'}))
    .pipe(gulp.dest(paths.html))
})

// Sass
gulp.task('sass', () => {
  gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sass(config.sassOptions))
    .pipe(autoprefixer())
    .pipe(gulpIf(config.envProduction, minifycss()))
    .pipe(gulp.dest(paths.css))
})

gulp.task('webpack', () => {
  return webpackStream(config.webpackOptions, webpack).pipe(gulp.dest(paths.out_js))
})

// Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    port: 8888,
    server: { baseDir: paths.html },
  })
  gulp.watch(paths.html + '**/*.html', ['reload'])
  gulp.watch(paths.css + '**/*.css', ['reload'])
  gulp.watch(paths.in_js + '**/*.js', ['reload'])
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
