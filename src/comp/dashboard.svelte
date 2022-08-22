<script>
    import {
        Adornment,
        AppBar,
        Button,
        Select,
        Text,
        TextInput,
    } from "svelte-doric"

    import ThemeSelector from "./theme-selector.svelte"
    import {themeName} from "../state/theme.mjs"

    const bijectionOptions = [
        {
            label: "Strike-slip",
            value: {
                description: "Works on most partitions.",
                validateSize: (n) => true,
            },
        },
        {
            label: "Shred-and-stretch",
            value: {
                description: "Even partition ↦ Even partition",
                validateSize: (n) => n % 2 === 0,
            },
        },
        {
            label: "Cut-and-stretch",
            value: {
                description: [
                    "Self-conjugate partition",
                    "Partition with distinct odd parts",
                ].join(" ↦ "),
                validateSize: (n) => n !== 2,
            },
        },
        {
            label: "Sylvester/Glaisher",
            value: {
                description: "Odd partition ↦ Partition with distinct parts",
                validateSize: (n) => true,
            },
        },
    ]

    let theme = null

    let sizeString = ""
    let bijection = bijectionOptions[0].value

    $: colorScheme = ($themeName === "light")
        ? "light"
        : "dark"

    $: size = parseInt(sizeString, 10)
    $: inputIsValid = (size >= 1 && bijection.validateSize(size) === true)
</script>

<style>
    dashboard-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    partition-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        padding: 8px;
    }
    description {
        width: 100%;
        height: 36px;
    }

    @media (min-width: 360px) {
        partition-form {
            width: 360px;
        }
    }
</style>

<dashboard-layout style="--color-scheme: {colorScheme};">
    <AppBar>
        Ferrers

        <Adornment slot="action">
            <ThemeSelector bind:theme />
        </Adornment>
    </AppBar>

    <main>
        <partition-form>
            <TextInput
                label="Size (n)"
                variant="outline"
                type="number"
                min={1}
                bind:value={sizeString}
            />
            <Select
                label="Bijection"
                variant="outline"
                color="primary"
                bind:value={bijection}
                options={bijectionOptions}
            />
            <description>
                <Text>{bijection.description}</Text>
            </description>

            <Button
                variant="fill"
                color="primary"
                disabled={inputIsValid === false}
            >
                ANIMATE
            </Button>
        </partition-form>
    </main>
</dashboard-layout>
