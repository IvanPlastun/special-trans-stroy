"use strict"

import { paths } from "../gulpfile.esm"
import webpack from "webpack"
import webpackStream from "webpack-stream"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import rename from "gulp-rename"
import gulp from "gulp"
import gulpif from "gulp-if"
import browserSync from "browser-sync"
import yargs from "yargs"

const webpackConfig = require("../webpack.config")
const argv = yargs.argv,
    production = !!argv.production

webpackConfig.mode = production ? "production" : "development"
webpackConfig.devtool = production ? false : "sourse-map"

function Scripts () {
    return gulp.src(paths.src.js)
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return {
                    title: "Scripts",
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(gulp.dest(paths.dist.js))
        .on("change", browserSync.reload)
}

export default Scripts
