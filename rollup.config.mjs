import copy from "@axel669/rollup-copy-static"
import $path from "@axel669/rollup-dollar-path"
import commonJS from "@rollup/plugin-commonjs"
import html from "@rollup/plugin-html"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import del from "rollup-plugin-delete"
import svelte from "rollup-plugin-svelte"

import htmlTemplate from "./html-template.mjs"

export default {
    input: "src/main.mjs",
    output: {
        file: "build/app.js",
        format: "esm",
        sourcemap: true,
    },
    plugins: [
        del({
            targets: "build/*",
        }),
        $path({
            root: "src",
            paths: {
                $comp: "src/comp",
                $state: "src/state",
            },
        }),
        svelte({
            emitCss: false,
        }),
        resolve(),
        commonJS(),
        html({
            fileName: "index.html",
            template: htmlTemplate,
        }),
        copy("static"),
        terser(),
    ],
}
