<script context="module">
    import {derived, writable} from "svelte/store"
    import {TronTheme} from "svelte-doric"

    import DarkTheme from "../theme/dark.svelte"
    import LightTheme from "../theme/light.svelte"

    const themeMap = {
        light: LightTheme,
        dark: DarkTheme,
        tron: TronTheme,
    }

    const currentThemeKey = writable(localStorage.theme ?? "light")

    const theme = derived(
        currentThemeKey,
        (key) => themeMap[key]
    )

    currentThemeKey.subscribe(
        (key) => {
            localStorage.theme = key
        }
    )

    export {
        theme,
    }
</script>

<script>
    import {Select, Text} from "svelte-doric"

    const iconMap = {
        light: "sun",
        dark: "moon",
        tron: "laptop",
    }

    const themes = [
        {label: "Light", icon: "sun", value: "light"},
        {label: "Dark", icon: "moon", value: "dark"},
        {label: "Tron", icon: "laptop", value: "tron"},
    ]

    $: icon = iconMap[$currentThemeKey]
</script>

<Select
    variant="normal"
    label="Theme"
    {icon}
    options={themes}
    bind:value={$currentThemeKey}
>
    <Text slot="selected"></Text>
</Select>
