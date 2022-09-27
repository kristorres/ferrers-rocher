import {tweened} from "svelte/motion"

import {Palette, equal} from "../color.mjs"

const {floor} = Math

const duration = 1000

function createFerrersDiagram(λ) {
    const dots = []
    const partCount = λ.length
    const {foreground} = Palette()

    for (let i = 0; i < partCount; i += 1) {
        for (let j = 0; j < λ[i]; j += 1) {
            dots.push({x: j, y: i, color: foreground})
        }
    }

    const {subscribe, update} = tweened(
        dots,
        {
            duration,
        }
    )

    const transform = (f, color = null) => {
        const apply = (dots) => {
            return dots.map(
                (dot) => {
                    if (color === null || equal(dot.color, color)) {
                        return f(dot)
                    }
                    return dot
                }
            )
        }

        return new Promise(
            (resolve) => {
                update(apply)
                setTimeout(resolve, duration)
            }
        )
    }

    const add = (color1, color2) => {
        const apply = (dots) => {
            const parts = new Map()

            for (const dot of dots) {
                if (equal(dot.color, color1)) {
                    const {x, y} = dot
                    const currentPart = parts.get(y)
                    const newPart = x + 1

                    if (currentPart === undefined || currentPart < newPart) {
                        parts.set(y, newPart)
                    }
                }
            }

            return dots.map(
                (dot) => {
                    if (equal(dot.color, color2)) {
                        const {x, y} = dot
                        return {
                            ...dot,
                            x: x + (parts.get(y) ?? 0),
                        }
                    }
                    return dot
                }
            )
        }

        return new Promise(
            (resolve) => {
                update(apply)
                setTimeout(resolve, duration)
            }
        )
    }

    const cut = async (a, b, c, color1, color2) => {
        await transform(
            (dot) => {
                const {x, y} = dot

                return {
                    ...dot,
                    color: (a * x + b * y < c) ? color2 : color1,
                }
            }
        )
    }

    const move = async (color, dx, dy) => {
        if (dx === 0 && dy === 0) {
            return
        }

        await transform(
            (dot) => {
                const {x, y} = dot

                return {
                    ...dot,
                    x: x + dx,
                    y: y + dy,
                }
            },
            color
        )
    }

    const paste = async (inputColor1, inputColor2, outputColor) => {
        await transform(
            (dot) => {
                const color = (
                    equal(dot.color, inputColor1)
                    || equal(dot.color, inputColor2)
                )
                    ? outputColor
                    : dot.color

                return {
                    ...dot,
                    color,
                }
            }
        )
    }

    const shift = async (color, a, b, c, d) => {
        await transform(
            (dot) => {
                const {x, y} = dot

                return {
                    ...dot,
                    x: a * x + b * y,
                    y: c * x + d * y,
                }
            },
            color
        )
    }

    const shred = async (inputColor, ...outputColors) => {
        const outputColorCount = outputColors.length

        if (outputColorCount === 0) {
            return
        }

        await transform(
            (dot) => {
                const {x} = dot

                return {
                    ...dot,
                    color: outputColors[x % outputColorCount],
                }
            },
            inputColor
        )
    }

    const stretch = async (color, k, l) => {
        if (l === 0 || (k === 1 && l === 1)) {
            return
        }

        await transform(
            (dot) => {
                const {x, y} = dot

                return {
                    ...dot,
                    x: floor(x * k),
                    y: floor(y / l),
                }
            },
            color
        )
    }

    const transpose = async (color) => {
        await transform(
            (dot) => {
                const {x, y} = dot

                return {
                    ...dot,
                    x: y,
                    y: x,
                }
            },
            color
        )
    }

    return {
        subscribe,
        add,
        cut,
        move,
        paste,
        shift,
        shred,
        stretch,
        transpose,
    }
}

export default createFerrersDiagram
