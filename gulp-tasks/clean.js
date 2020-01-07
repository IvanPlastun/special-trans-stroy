"use strict"

import { paths } from "../gulpfile.esm"
import del from "del"


function CleanDist () {
    return del(paths.dist.clean)
}

export default CleanDist