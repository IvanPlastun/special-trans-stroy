"use strict"

import { paths } from "../gulpfile.esm"

import gulp from "gulp"
import gulpif from "gulp-if"
import browserSync from "browser-sync"
import pug from "gulp-pug"
import htmlBeautify from "gulp-html-beautify"
import cleanHTML from "gulp-htmlclean"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import yargs from "yargs"

const production = yargs.argv.production

const htmlBeautifyOptions = {
    "indent_size": 1,
	"indent_char": "	",
	"eol": "\n",
	"indent_level": 0,
	"indent_with_tabs": true,
	"preserve_newlines": false,
	"max_preserve_newlines": 10,
	"jslint_happy": false,
	"space_after_anon_function": false,
	"brace_style": "collapse",
	"keep_array_indentation": false,
	"keep_function_indentation": false,
	"space_before_conditional": true,
	"break_chained_methods": false,
	"eval_code": false,
	"unescape_strings": false,
	"wrap_line_length": 0,
	"wrap_attributes": "auto",
	"wrap_attributes_indent_size": 4,
	"end_with_newline": false
}

function CompilePug () {
    return gulp.src(paths.src.pug)
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return {
                    title: "CompilePug",
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(pug())
        .pipe(gulpif(production, cleanHTML()))
        .pipe(htmlBeautify(htmlBeautifyOptions))
        .pipe(gulp.dest(paths.dist.html))
        .pipe(browserSync.stream())
}

export default CompilePug