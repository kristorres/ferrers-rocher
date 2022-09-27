function Color(red, green, blue, alpha = 1) {
    return Object.freeze({red, green, blue, alpha})
}

function Palette(alpha = 1) {
    const color = (red, green, blue) => Color(red, green, blue, alpha)

    if (localStorage.theme === "light") {
        return {
            red: color(255, 49, 38),
            orange: color(245, 139, 0),
            yellow: color(245, 194, 0),
            green: color(30, 195, 55),
            mint: color(0, 189, 180),
            blue: color(0, 112, 245),
            indigo: color(84, 82, 204),
            purple: color(159, 75, 201),
            pink: color(245, 35, 75),
            brown: color(152, 122, 84),
            gray: color(132, 132, 137),
            foreground: color(0, 0, 0),
        }
    }

    return {
        red: color(255, 79, 68),
        orange: color(255, 169, 20),
        yellow: color(255, 224, 20),
        green: color(60, 225, 85),
        mint: color(108, 224, 219),
        blue: color(20, 142, 255),
        indigo: color(99, 97, 242),
        purple: color(204, 101, 255),
        pink: color(255, 65, 105),
        brown: color(182, 152, 114),
        gray: color(162, 162, 167),
        foreground: color(255, 255, 255),
    }
}

function equal(color1, color2) {
    if (color1 === null && color2 === null) {
        return true
    }
    if (color1 === null || color2 === null) {
        return false
    }

    return (
        color1.red === color2.red
        && color1.green === color2.green
        && color1.blue === color2.blue
        && color1.alpha === color2.alpha
    )
}

export default Color
export {
    Palette,
    equal,
}
