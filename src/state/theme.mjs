import {derived, writable} from "svelte/store"
import {DarkTheme, LightTheme, TronTheme} from "svelte-doric/theme"

const themeMap = {
    light: LightTheme,
    dark: DarkTheme,
    tron: TronTheme,
}

const themeName = writable(localStorage.theme ?? "light")

const theme = derived(
    themeName,
    (name) => themeMap[name]
)

themeName.subscribe(
    (name) => {
        localStorage.theme = name
    }
)

export default theme
export {
    themeName
}
