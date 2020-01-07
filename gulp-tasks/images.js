"use strict"

import { paths } from "../gulpfile.esm"
import gulp from "gulp"
import browserSync from "browser-sync"
import gulpif from "gulp-if"
import imagemin from "gulp-imagemin"
import imageminGifLossy from "imagemin-giflossy"
import imageminPngQuant from "imagemin-pngquant"
import imageminMozJpeg from "imagemin-mozjpeg"
import imageminZopfli from "imagemin-zopfli"
import yargs from "yargs"

const argv = yargs.argv,
    production = !!argv.production

function Images () { 
    return gulp.src(paths.src.images)
        .pipe(gulpif(production, imagemin([
            imageminGifLossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 5
            }),
            imageminPngQuant({
                speed: 6,
                quality: [0.7, 0.9],
                strip: true
            }),
            imageminZopfli({
                more: true
            }),
            imageminMozJpeg({
                quality: 95,
                progressive: true
            }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {removeUnusedNS: false},
                    {removeUselessStrokeAndFill: false},
                    {cleanupIDs: false},
                    {removeComments: true},
                    {removeEmptyAttrs: true},
                    {removeEmptyText: true},
                    {collapseGroups: true}
                ]
            })
        ])))
        .pipe(gulp.dest(paths.dist.images))
        .on("end", browserSync.reload)   
}

export default Images