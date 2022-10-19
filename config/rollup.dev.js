import $path from "@axel669/rollup-dollar-path"
import commonJS from "@rollup/plugin-commonjs"
import html from "@rollup/plugin-html"
import resolve from "@rollup/plugin-node-resolve"
import copy from "rollup-plugin-copy"
import del from "rollup-plugin-delete"
import svelte from "rollup-plugin-svelte"

import htmlTemplate from "./html-template.js"

const timestamp = Date.now()
const iconRegex = /^([a-z0-9]+-)+(fav)?icon$/

export default {
    input: "src/main.js",
    output: {
        file: `build/app-d${timestamp}.js`,
        format: "iife",
    },
    plugins: [
        del({
            targets: "build/*",
        }),
        $path({
            root: "src",
            extensions: [".js", ".mjs", ".svelte"],
        }),
        svelte(),
        resolve(),
        commonJS(),
        html({
            template: htmlTemplate(timestamp),
        }),
        copy({
            targets: [
                {
                    src: ["static/*", "!**/images"],
                    dest: "build",
                },
                {
                    src: "static/images/*",
                    dest: "build/images",
                    rename: (name, extension) => {
                        if (iconRegex.test(name) === true) {
                            return `${name}-${timestamp}.${extension}`
                        }
                        return `${name}.${extension}`
                    },
                },
            ],
        }),
    ],
}
