// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;
// SCSS файл в котором подключаются все шрифты
const fontsFile = `${srcFolder}/styles/default/fonts.scss`;
const exceptionCopyFiles = [
  'blocks',
  'fonts',
  'images',
  'pages',
  'scripts',
  'styles'
]

export const path = {
  build: {
    html: `${buildFolder}/`,
    pug: `${buildFolder}/`,
    js: `${buildFolder}/bundles/`,
    css: `${buildFolder}/bundles/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    copyFiles: `${buildFolder}/`,
  },
  src: {
    html: `${srcFolder}/pages/**/*.html`,
    pug: `${srcFolder}/pages/**/*.pug`,
    scss: [`${srcFolder}/pages/**/*.scss`, `${srcFolder}/styles/*.scss`],
    svgicons: `${srcFolder}/svgicons/*.svg`,
    js: `${srcFolder}/scripts/app.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    blocksImages: `${srcFolder}/blocks/**/*.{jpg,jpeg,png,gif,webp}`,
    blocksImagesSvg: `${srcFolder}/blocks/**/*.svg`,
    svg: `${srcFolder}/images/*.svg`,
    copyFiles: [
      `${srcFolder}/**/*.* `,
      `!${srcFolder}/{${exceptionCopyFiles.toString()}}/**/*.*`
    ],
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    pug: `${srcFolder}/**/*.pug`,
    scss: `${srcFolder}/**/*.scss`,
    js: `${srcFolder}/**/*.js`,
    blocksImages: `${srcFolder}/blocks/**/*.{jpg,jpeg,png,gif,webp}`,
    images: `${srcFolder}/images/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    copyFiles: [
      `${srcFolder}/**/*.*`,
      `!${srcFolder}/{${exceptionCopyFiles.toString()}}/**/*.*`
    ],
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`,
  fontsFile: fontsFile,
};