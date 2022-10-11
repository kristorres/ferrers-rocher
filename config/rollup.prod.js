import {terser} from "rollup-plugin-terser"

import config from "./rollup.dev.js"
import {version} from "../package.json"

config.output.file = `build/app-v${version}.min.js`
config.plugins.push(terser())

export default config
