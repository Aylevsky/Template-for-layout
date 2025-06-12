import gulp from 'gulp';
import fileinclude from "gulp-file-include";
import GulpPug from "gulp-pug";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import rename from "gulp-rename";
import notify from 'gulp-notify/lib/notify.js';
import plumber from 'gulp-plumber';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';

export const pug = (isBuild, serverInstance) => {
  return gulp
    .src(filePaths.src.pug)
    .pipe(
      plumber(
        notify.onError(function (error) {
          return "\x1b[31m" + error.message + "\x1b[0m";
        })
      )
    )
    .pipe(
      GulpPug({
        // Сжимать HTML
        pretty: true,

        // Показывать название файла в терминале
        verbose: true,
      })
    )
    .pipe(plugins.replace(/@img\//g, "./images/"))
    .pipe(fileinclude())
    .pipe(plugins.if(isBuild, webpHtmlNosvg()))
    .pipe(
      plugins.if(
        !isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(filePaths.buildFolder))
    .pipe(serverInstance.stream());
};
