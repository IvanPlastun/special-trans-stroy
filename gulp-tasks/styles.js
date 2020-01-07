"use strict"

import { paths } from "../gulpfile.esm"
import gulp from "gulp"
import browserSync from "browser-sync"
import rename from "gulp-rename"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import gulpif from "gulp-if"
import sass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import sourcemaps from "gulp-sourcemaps"
import mincss from "gulp-clean-css"
import gulpGroupMediaQueries from "gulp-group-css-media-queries"
import yargs from "yargs"


const argv = yargs.argv,
    production = !!argv.production

function Styles () {
    return gulp.src(paths.src.styles)
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return {
                    title: "Styles",
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(gulpif(production, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpGroupMediaQueries())
        .pipe(gulpif(production, autoprefixer({
            cascade: false
        })))
        .pipe(gulpif(production, mincss({
            compatibility: "ie9", level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhiteSpace: true
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeBuplicateRules: true,
                    removeUnusedAtRules: false
                }
            }
        })))
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(gulpif(production, sourcemaps.write("./maps/")))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(browserSync.stream())
}

export default Styles