"use strict"

import { paths } from "../gulpfile.esm"
import browserSync from "browser-sync"
import gulp from "gulp"
import svg from "gulp-svg-sprite"
import plumber from "gulp-plumber"
import notify from "gulp-notify"

function SVGSprite () {
    return gulp.src(paths.src.svg)
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return {
                    title: "SVGSprite",
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(svg({
            shape: {
                dest: "base-svg"
            },
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(paths.dist.svg))
        .on("end", browserSync.reload)
}

export default SVGSprite