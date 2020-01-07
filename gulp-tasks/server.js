import { paths } from "../gulpfile.esm"
import gulp from "gulp"
import browserSync from "browser-sync"
import compilePug from "./pug"
import styles from "./styles"
import scripts from "./scripts"
import images from './images'
import fonts from "./fonts"
import svg from "./svg"


function Server () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 8081
    })

    gulp.watch(paths.watch.pug).on("change", gulp.series(compilePug))
    gulp.watch(paths.watch.styles).on("change", gulp.series(styles))
    gulp.watch(paths.watch.js).on("change", gulp.series(scripts))
    gulp.watch(paths.watch.images).on("change", gulp.series(images))
    gulp.watch(paths.watch.fonts).on("change", gulp.series(fonts))
    gulp.watch(paths.watch.svg).on("change", gulp.series(svg))
}

export default Server