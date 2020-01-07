import gulp from "gulp"

import clean from "./gulp-tasks/clean"
import scripts from "./gulp-tasks/scripts"
import styles from "./gulp-tasks/styles"
import svg from "./gulp-tasks/svg"
import server from "./gulp-tasks/server"
import images from "./gulp-tasks/images"
import fonts from "./gulp-tasks/fonts"
import compilePug from "./gulp-tasks/pug"
import copyLibsLocal from "./gulp-tasks/copyLibsLocal"

const paths = {
    src: {
        pug: "./src/pug/pages/**/*.pug",
        styles: "./src/sass/**/main.scss",
        js: "./src/js/**/*.js",
        images: "./src/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
        svg: "./src/assets/img/svg/**/*.svg",
        fonts: "./src/assets/fonts/**/*.{eot,ttf,otf,woff,woff2}",
        libs: "./src/libs/**/*.*"
    },
    dist: {
        clean: "./dist",
        html: "./dist",
        styles: "./dist/css",
        js: "./dist/js",
        images: "./dist/assets/img",
        svg: "./dist/assets/img/svg-sprites",
        fonts: "./dist/assets/fonts",
        libs: "./dist/libs/"
    },
    watch: {
        pug: "./src/pug/**/*.pug",
        styles: "./src/sass/**/*.{sass,scss}",
        js: "./src/js/**/*.js",
        images: "./src/assets/img/**/*.{jpg,jpeg,png,gif,svg,tiff}",
        svg: "./src/assets/img/svg/**/*.svg",
        fonts: "./src/assets/fonts/**/*.{eot,ttf,otf,woff,woff2}"
    }
}

export { paths }

export const development = gulp.series(clean,
    gulp.parallel([compilePug, styles, scripts, copyLibsLocal, images, fonts, svg]),
    server    
)

export const production = gulp.series(
    clean,
    gulp.parallel([compilePug, styles, scripts, copyLibsLocal, images, fonts, svg]),
    server
)

export default development