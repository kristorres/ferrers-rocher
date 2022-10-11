<script>
    import {
        Adornment,
        AppBar,
        Button,
        Flex,
        Icon,
        Paper,
        Screen,
        Select,
        Text,
        dialog,
    } from "svelte-doric"

    import IntegerInput from "./control/integer-input.svelte"
    import BijectionModal from "./dashboard/bijection-modal.svelte"
    import Settings from "./dashboard/settings.svelte"
    import bijections from "$/bijections.mjs"

    const bijectionOptions = bijections.map(
        (bijection) => {
            const {name} = bijection

            return {
                label: name,
                value: bijection,
            }
        }
    )

    let navigation = null

    let size = null
    let bijection = bijectionOptions[0].value

    $: inputIsValid = (size > 0 && bijection.allowPartitionSize(size) === true)

    async function showBijection() {
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

    async function showSettings() {
        document.activeElement.blur()
        await navigation.openStack(Settings)
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

<Screen bind:this={navigation}>
    <AppBar fixed slot="title">
        Ferrers

        <Adornment slot="action">
            <Button on:tap={showSettings}>
                <Icon name="gear" />
            </Button>
        </Adornment>
    </AppBar>

    <Paper square card>
        <Flex padding="16px" scrollable>
            <bijection-form>
                <Flex gap="16px" padding="0px">
                    <IntegerInput
                        label="Size"
                        bind:value={size}
                        min={1}
                        placeholder="n = 1,000"
                    />
                    <Select
                        label="Bijection"
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
                        on:tap={showBijection}
                        disabled={inputIsValid === false}
                    >
                        SHOW BIJECTION
                    </Button>
                </Flex>
            </bijection-form>
        </Flex>
    </Paper>
</Screen>
