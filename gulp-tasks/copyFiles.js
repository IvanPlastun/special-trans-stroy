import { paths } from "../gulpfile.esm"
import gulp from "gulp"

function copyFiles (cb) {
    gulp.src(paths.src.files.docs)
        .pipe(gulp.dest(paths.dist.files.docs))
    gulp.src(paths.src.files.img)
        .pipe(gulp.dest(paths.dist.files.img))
    cb()
}

export default copyFiles