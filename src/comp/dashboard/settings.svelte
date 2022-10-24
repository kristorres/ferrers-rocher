<script context="module">
    import {derived} from "svelte/store"
    import {Grid, TronTheme} from "svelte-doric"

    import Storage from "$/state/storage.mjs"
    import DarkTheme from "$/theme/dark.svelte"
    import LightTheme from "$/theme/light.svelte"

    const animationSpeed = Storage("animationSpeed", 1)
    const dotRadius = Storage("dotRadius", 4)
    const maxIterationCount = Storage("maxIterationCount", 1e4)
    const themeKey = Storage("theme", "light")

    const themeMap = {
        light: LightTheme,
        dark: DarkTheme,
        tron: TronTheme,
    }

    const theme = derived(
        themeKey,
        (key) => themeMap[key]
    )

    export {
        animationSpeed,
        dotRadius,
        maxIterationCount,
        theme,
    }
</script>

<script>
    import {
        Button,
        Divider,
        Flex,
        Paper,
        Screen,
        Select,
        TitleBar,
    } from "svelte-doric"

    import Slider from "$/comp/control/slider.svelte"

    const numberFormatter = new Intl.NumberFormat("en-US")

    const keyIconPairs = [
        ["light", "sun"],
        ["dark", "moon"],
        ["tron", "laptop"],
    ]

    const capitalize = (string) => {
        const [firstLetter, ...rest] = string

        return `${firstLetter.toUpperCase()}${rest.join("")}`
    }

    const themeOptions = keyIconPairs.map(
        (pair) => {
            const [key, icon] = pair

            return {
                label: capitalize(key),
                icon,
                value: key,
            }
        }
    )

    const maxIterationCountOptions = [1e3, 5e3, 1e4, 5e4, 1e5].map(
        (value) => ({
            label: numberFormatter.format(value),
            value,
        })
    )

    let navigation = null

    function close() {
        navigation.close()
    }
</script>

<Screen bind:this={navigation}>
    <TitleBar compact slot="title">
        Settings
    </TitleBar>
    <Paper square layout={Flex} lgap="16px" lpadding="16px" lscrollable>
        <Select
            label="Theme"
            color="primary"
            bind:value={$themeKey}
            options={themeOptions}
        />
        <Divider />
        <Slider
            label="Dot Radius"
            bind:value={$dotRadius}
            min={1}
            max={4}
            step={0.1}
        />
        <Slider
            label="Animation Speed (step/s)"
            bind:value={$animationSpeed}
            min={0.25}
            max={2}
            step={0.25}
        />
        <Select
            label="Max # of Iterations"
            color="primary"
            bind:value={$maxIterationCount}
            options={maxIterationCountOptions}
        />
    </Paper>
    <Paper square flat layout={Grid} lcols="1fr" slot="footer">
        <Button color="secondary" on:tap={close}>
            CLOSE
        </Button>
    </Paper>
</Screen>
