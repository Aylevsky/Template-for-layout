/**
 * Файл содержит обработчик SCSS
 */

import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssGroupMedia from 'postcss-sort-media-queries';
import sourcemaps from 'gulp-sourcemaps';
import sassGlob from 'gulp-sass-glob';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { logger } from '../config/logger.js';

const sass = gulpSass(dartSass);

export const scss = (isBuild, serverInstance) => {
  const webpConfig = {
    webpClass: '.webp',
    noWebpClass: '.no-webp',
  };

  return gulp.src(filePaths.src.scss)
    .pipe(logger.handleError('SCSS'))
    .pipe(sassGlob())
    .pipe(plugins.if(!isBuild, sourcemaps.init()))
    .pipe(sass({ outputStyle: 'expanded' }, null))

    /**
     * Сокращения
     */
    // Путь к картинкам
    .pipe(plugins.replace(/@img\//g, '../../../images/'))

    // Сокращение миксина размера
    .pipe(plugins.replace('@size', `@include size`))
    .pipe(plugins.replace('@ad-size', `@include ad-size`))
    .pipe(plugins.replace('@line-height', `@include line-height`))
    .pipe(plugins.replace('@ad', `@include adaptiv-value`))
    .pipe(plugins.replace('@med', `@include media`))

    .pipe(plugins.if(isBuild, webpCss(webpConfig)))
    .pipe(plugins.if(isBuild, postcss([
      autoprefixer(),
      postcssPresetEnv(),
      postcssGroupMedia({ sort: 'desktop-first' }),
    ])))
    .pipe(gulp.dest(filePaths.build.css))
    .pipe(plugins.if(isBuild, cleanCss()))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(plugins.if(!isBuild, sourcemaps.write('.')))
    .pipe(gulp.dest(filePaths.build.css))
    .pipe(serverInstance.stream());
};
