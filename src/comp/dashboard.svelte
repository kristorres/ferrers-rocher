<script>
    import {Adornment, TitleBar} from "svelte-doric"

    import ThemeSelector from "./theme-selector.svelte"
    import {themeName} from "../state/theme.mjs"

    let theme = null

    $: colorScheme = ($themeName === "light")
        ? "light"
        : "dark"
</script>

<app-layout style="--color-scheme: {colorScheme};">
    <TitleBar sticky>
        Ferrers

        <Adornment slot="action">
            <ThemeSelector bind:theme />
        </Adornment>
    </TitleBar>
</app-layout>
