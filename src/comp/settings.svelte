<svelte:options immutable />

<script context="module">
    import Storage from "$state/storage.mjs"

    const appID = "ferrers-rocher"

    const animationSpeed = Storage(`${appID}.animationSpeed`, 1)
    const dotRadius = Storage(`${appID}.dotRadius`, 4)
    const maxIterationCount = Storage(`${appID}.maxIterationCount`, 1e4)
    const theme = Storage(`${appID}.theme`, "light")

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
        Paper,
        Screen,
        Select,
        Text,
        Titlebar,
    } from "@axel669/zephyr"

    import Slider from "./control/slider.svelte"
    import Icon from "./icon.svelte"

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
    <Paper card square scrollable l-gap="16px" l-p="16px">
        <Titlebar fill color="@primary" slot="header">
            <Text title t.wt="700" slot="title">
                Settings
            </Text>

            <Button compact ground m="4px" on:click={close} slot="action">
                <Icon name="x" t.sz="20px" />
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
