import {derived, writable} from "svelte/store"
import {TronTheme} from "svelte-doric/theme"

import DarkTheme from "../theme/dark.svelte"
import LightTheme from "../theme/light.svelte"

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
