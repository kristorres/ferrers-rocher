<script>
    import {
        Adornment,
        AppBar,
        Button,
        Flex,
        Paper,
        Screen,
        Select,
        Text,
        TextInput,
    } from "svelte-doric"

    import ThemePicker from "./theme-picker.svelte"

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

    let sizeString = ""
    let bijection = bijectionOptions[0].value

    $: size = parseInt(sizeString, 10)
    $: inputIsValid = (size >= 1 && bijection.validateSize(size) === true)
</script>

<style>
    partition-form {
        width: 100%;
        margin: 0 auto;
    }
    description-area {
        width: 100%;
        height: 36px;
    }

    @media (min-width: 360px) {
        partition-form {
            width: 360px;
        }
    }
</style>

<Screen>
    <AppBar fixed slot="title">
        Ferrers

        <Adornment slot="action">
            <ThemePicker />
        </Adornment>
    </AppBar>

    <Paper square card>
        <Flex padding="16px" scrollable>
            <partition-form>
                <Flex gap="16px" padding="0px">
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
                    <description-area>
                        <Text>{bijection.description}</Text>
                    </description-area>

                    <Button
                        variant="fill"
                        color="primary"
                        disabled={inputIsValid === false}
                    >
                        ANIMATE
                    </Button>
                </Flex>
            </partition-form>
        </Flex>
    </Paper>
</Screen>
