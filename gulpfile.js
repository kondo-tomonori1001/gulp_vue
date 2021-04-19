// 必要プラグインの読み込み 
const gulp = require("gulp");
const gulpIf = require('gulp-if');

// ファイルのclean-up
const del = require('del');
function clean(done){
  const distFiles = './dist/**/*';
  del(distFiles);
  done();
}

// Sassコンパイル
const sass = require('gulp-sass');
sass.compiler = require("dart-sass");
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');

function sassCompile(){
  return (
    gulp
    .src('src/common/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(
      postcss([
      autoprefixer({
        cascade:false,
        grid:true
        })
      ])
    )
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/common/styles'))
  );
}
exports.sassCompile = sassCompile;

function sassCompileBuild(){
  return (
    gulp
    .src('src/common/sass/main.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(
      postcss([
      autoprefixer({
        cascade:false,
        grid:true
        })
      ])
    )
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist/common/styles'))
  );
}
exports.sassCompileBuild = sassCompileBuild;

// CSS圧縮
const cleancss = require('gulp-clean-css');
function cssMinimum(){
  return(
    gulp
      .src('dist/common/styles/style.css')
      .pipe(cleancss())
      .pipe(rename({
        extname:'.min.css'
      }))
      .pipe(gulp.dest('./dist/common/styles'))
  );
}
exports.cssMinimum = cssMinimum;

// webpackの設定ファイルの読み込み
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackDev = require("./webpack.dev");
const webpackProd = require("./webpack.prod");

const webpackDevTask = () => {
  return webpackStream(webpackDev, webpack)
  .pipe(gulp.dest("dist"));
}
const webpackProdTask = () => {
  return webpackStream(webpackProd, webpack)
  .pipe(gulp.dest("dist"));
}

exports.default = gulp.series(clean,webpackDevTask,sassCompile,cssMinimum);
exports.build = gulp.series(clean,webpackProdTask,sassCompileBuild,cssMinimum);