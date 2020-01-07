"use strict"

import { paths } from "../gulpfile.esm"
import gulp from "gulp"

function CopyLibsLocal () {
    return gulp.src(paths.src.libs)
        .pipe(gulp.dest(paths.dist.libs))
}

export default CopyLibsLocal