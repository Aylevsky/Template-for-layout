import { resolve, basename } from 'node:path';

const buildFolder = './dist';
const srcFolder = './src';

export const filePaths = {
  build: {
    js: `${buildFolder}/scripts/`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
  },
  src: {
    js: `${srcFolder}/scripts/*.js`,
    images: [
      `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
      `${srcFolder}/components/**/*.{jpg,jpeg,png,gif,webp}`
    ],
    svg: `${srcFolder}/images/**/*.svg`,
    scss: [`${srcFolder}/styles/main.scss`, `${srcFolder}/pages/**/*.scss`],
    html: `${srcFolder}/pages/**/*.html`,
    pug: `${srcFolder}/pages/**/*.pug`,
    static: `${srcFolder}/static/**/*.*`,
    svgIcons: `${srcFolder}/icons/*.svg`,
    fontFacesFile: `${srcFolder}/styles/default/fonts.scss`,
    fonts: `${srcFolder}/fonts/`,
  },
  watch: {
    js: `${srcFolder}/scripts/**/*.js`,
    scss: `${srcFolder}/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    pug: `${srcFolder}/**/*.pug`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    static: `${srcFolder}/static/**/*.*`,
  },
  buildFolder,
  srcFolder,
  projectDirName: basename(resolve()),
  // Путь к нужной папке на удаленном сервере. Gulp добавит имя папки проекта автоматически
  ftp: '',
};
