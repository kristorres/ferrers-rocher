import store from "@axel669/json-storage"

const local = store(localStorage)

const Color = (red, green, blue, alpha = 1) => {
    return Object.freeze({red, green, blue, alpha})
}

const Palette = (alpha = 1) => {
    const color = (red, green, blue) => Color(red, green, blue, alpha)

    if (local["ferrers-rocher.theme"] === "light") {
        return {
            red: color(250, 34, 27),
            orange: color(255, 140, 0),
            gold: color(255, 196, 0),
            yellow: color(255, 235, 59),
            lime: color(199, 238, 29),
            green: color(38, 215, 40),
            mint: color(47, 195, 141),
            teal: color(0, 139, 132),
            cyan: color(0, 222, 234),
            blue: color(41, 121, 255),
            indigo: color(63, 81, 181),
            violet: color(116, 29, 219),
            purple: color(154, 23, 157),
            magenta: color(240, 32, 253),
            pink: color(255, 128, 166),
            brown: color(136, 80, 36),
            gray: color(112, 127, 134),
            silver: color(184, 191, 195),
            foreground: color(0, 0, 0),
        }
    }

    return {
        red: color(246, 62, 61),
        orange: color(255, 152, 0),
        gold: color(255, 204, 4),
        yellow: color(255, 238, 88),
        lime: color(208, 241, 74),
        green: color(91, 222, 81),
        mint: color(97, 206, 161),
        teal: color(0, 152, 146),
        cyan: color(114, 232, 239),
        blue: color(31, 139, 255),
        indigo: color(92, 107, 192),
        violet: color(138, 72, 226),
        purple: color(170, 62, 171),
        magenta: color(244, 124, 253),
        pink: color(255, 180, 202),
        brown: color(160, 104, 64),
        gray: color(135, 146, 150),
        silver: color(214, 216, 217),
        foreground: color(255, 255, 255),
    }
}

const equal = (color1, color2) => {
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
