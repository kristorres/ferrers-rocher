function Color(red, green, blue, alpha = 1) {
    return {red, green, blue, alpha}
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
    equal,
}
