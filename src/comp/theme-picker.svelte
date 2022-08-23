<script>
    import {Select, Text} from "svelte-doric"

    import {themeName} from "../state/theme.mjs"

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

    $: icon = iconMap[$themeName]
</script>

<Select
    variant="normal"
    label="Theme"
    {icon}
    options={themes}
    bind:value={$themeName}
>
    <Text slot="selected"></Text>
</Select>
