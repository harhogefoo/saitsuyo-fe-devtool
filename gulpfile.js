var gulp = require('gulp')

var pug = require('gulp-pug')
gulp.task('pug', () => {
  // _ から始まるファイルはコンパイル対象外。インクルード用のファイルのため
  return gulp.src(['./assets/pug/**/*.pug', '!./assets/pug/**/_*.pug'])
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./public/'))
})

var sass = require('gulp-sass')
gulp.task('sass', function() {
  gulp.src('./assets/sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', function() {
  gulp.watch('./assets/sass/*.scss', ['sass'])
})
gulp.task('default', ['pug', 'sass'])
