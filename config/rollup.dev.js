import html from "@axel669/rollup-html"
import tea from "@axel669/teascript/rollup"
import svelteTea from "@axel669/teascript/svelte"
import commonJS from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import del from "rollup-plugin-delete"
import svelte from "rollup-plugin-svelte"

import appInfo from "./app-info.js"
import copy from "./plugins/copy.js"

export default {
    input: "./src/main.js",
    output: {
        file: `./build/app-d${Date.now()}.js`,
        format: "iife",
    },
    plugins: [
        del({
            targets: "./build/*",
        }),
        svelte({
            preprocess: svelteTea,
        }),
        tea,
        resolve(),
        commonJS(),
        html({
            template: "config/base.html",
            output: "index.html",
            props: appInfo,
        }),
        copy("static", "build"),
    ],
}
