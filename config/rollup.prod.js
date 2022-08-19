import html from "@axel669/rollup-html"
import commonJS from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import svelte from "rollup-plugin-svelte"
import {terser} from "rollup-plugin-terser"

import appInfo from "./app-info.js"
import copy from "./plugins/copy.js"
import {version} from "../package.json"

export default {
    input: "./src/main.js",
    output: {
        file: `./build/app-v${version}.min.js`,
        format: "iife",
    },
    plugins: [
        svelte(),
        resolve({
            extensions: [".js", ".svelte"],
        }),
        commonJS(),
        terser(),
        html({
            template: "config/base.html",
            output: "index.html",
            props: appInfo,
        }),
        copy("static", "build"),
    ],
}
