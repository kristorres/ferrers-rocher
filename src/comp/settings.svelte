<script context="module">
    import Storage from "$/state/storage.mjs"

    const animationSpeed = Storage("animationSpeed", 1)
    const dotRadius = Storage("dotRadius", 4)
    const maxIterationCount = Storage("maxIterationCount", 1e4)
    const theme = Storage("theme", "light")

    export {
        animationSpeed,
        dotRadius,
        maxIterationCount,
        theme,
    }
</script>

<script>
    export let close

    import {
        Button,
        Icon,
        Paper,
        Screen,
        Select,
        Text,
        Titlebar,
    } from "@axel669/zephyr"

    import Slider from "./control/slider.svelte"

    const numberFormatter = new Intl.NumberFormat("en-US")

    const themes = ["light", "dark", "tron"]
    const maxIterationCounts = [1e3, 5e3, 1e4, 5e4, 1e5]

    const capitalize = (string) => {
        const [firstLetter, ...rest] = string

        return `${firstLetter.toUpperCase()}${rest.join("")}`
    }

    const themeOptions = themes.map(
        (theme) => ({
            label: capitalize(theme),
            value: theme,
        })
    )

    const maxIterationCountOptions = maxIterationCounts.map(
        (value) => ({
            label: numberFormatter.format(value),
            value,
        })
    )
</script>

<Screen>
    <Paper card square scrollable l-gap="16px" l-pad="16px">
        <Titlebar fill color="primary" slot="header">
            <Text title slot="title">
                Settings
            </Text>

            <Button color={false} on:click={close} slot="action">
                <Icon name="x" t-sz="24px" />
            </Button>
        </Titlebar>

        <Select
            label="Theme"
            bind:value={$theme}
            options={themeOptions}
        />
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
            bind:value={$maxIterationCount}
            options={maxIterationCountOptions}
        />
    </Paper>
</Screen>
