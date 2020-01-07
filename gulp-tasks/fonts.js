"use strict"

import { paths } from "../gulpfile.esm"
import gulp from "gulp"

function CopyFonts () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts))
}

export default CopyFonts