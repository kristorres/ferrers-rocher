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
        dialog,
    } from "svelte-doric"

    import BijectionModal from "./bijection-modal.svelte"
    import ThemePicker from "./theme-picker.svelte"

    const bijections = [
        {
            name: "Strike-slip",
            description: "Works on most partitions.",
            allowPartitionSize: (n) => true,
            randomPartitionMethod: (n) => ({
                name: "randomByPDCDSH",
                args: {
                    n,
                },
            }),
        },
        {
            name: "Shred-and-stretch",
            description: "Even partition ↦ Even partition",
            allowPartitionSize: (n) => n % 2 === 0,
            randomPartitionMethod: (n) => ({
                name: "randomByPDCDSH",
                args: {
                    n,
                    policy: "even",
                },
            }),
        },
        {
            name: "Cut-and-stretch",
            description: [
                "Self-conjugate partition",
                "Partition with distinct odd parts",
            ].join(" ↦ "),
            allowPartitionSize: (n) => n !== 2,
            randomPartitionMethod: (n) => ({
                name: "randomSelfConjugate",
                args: {
                    n,
                },
            }),
        },
        {
            name: "Sylvester/Glaisher",
            description: "Odd partition ↦ Partition with distinct parts",
            allowPartitionSize: (n) => true,
            randomPartitionMethod: (n) => ({
                name: "randomByPDCDSH",
                args: {
                    n,
                    policy: "odd",
                },
            }),
        },
    ]

    const bijectionOptions = bijections.map(
        (bijection) => {
            const {name} = bijection

            return {
                label: name,
                value: bijection,
            }
        }
    )

    let sizeString = ""
    let bijection = bijectionOptions[0].value

    $: size = parseInt(sizeString, 10)
    $: inputIsValid = (size > 0 && bijection.allowPartitionSize(size) === true)

    async function animateBijection() {
        document.activeElement.blur()
        await dialog.show(
            BijectionModal,
            {
                input: {
                    n: size,
                    bijection,
                },
                persistent: true,
            }
        )
    }
</script>

<style>
    bijection-form {
        width: 100%;
        margin: 0 auto;
    }
    description-area {
        width: 100%;
        height: 36px;
    }

    @media (min-width: 360px) {
        bijection-form {
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
            <bijection-form>
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
                        on:tap={animateBijection}
                        disabled={inputIsValid === false}
                    >
                        ANIMATE
                    </Button>
                </Flex>
            </bijection-form>
        </Flex>
    </Paper>
</Screen>
