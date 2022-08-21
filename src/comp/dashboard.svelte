<script>
    import {Adornment, AppBar} from "svelte-doric"

    import ThemeSelector from "./theme-selector.svelte"
    import {themeName} from "../state/theme.mjs"

    let theme = null

    $: colorScheme = ($themeName === "light")
        ? "light"
        : "dark"
</script>

<app-layout style="--color-scheme: {colorScheme};">
    <AppBar>
        Ferrers

        <Adornment slot="action">
            <ThemeSelector bind:theme />
        </Adornment>
    </AppBar>
</app-layout>
