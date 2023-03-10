<script>
    import {
        Appbar,
        Button,
        Flex,
        Grid,
        Icon,
        Paper,
        Screen,
        Select,
        Text,
    } from "svelte-doric"

    import IntegerInput from "./control/integer-input.svelte"
    import BijectionScreen from "./dashboard/bijection-screen.svelte"
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

    const showBijection = async () => {
        document.activeElement.blur()

        await navigation.openStack(
            BijectionScreen,
            {
                input: {
                    n: size,
                    bijection,
                },
            }
        )
    }

    const showSettings = async () => {
        document.activeElement.blur()

        await navigation.openStack(Settings)
    }

    $: inputIsValid = (size > 0 && bijection.allowPartitionSize(size) === true)
</script>

<style>
    bijection-form {
        align-self: center;
        justify-self: center;
        width: min(100%, 360px);
    }
    description-area {
        width: 100%;
        height: 36px;
    }
</style>

<Screen bind:this={navigation}>
    <Appbar slot="title">
        Ferrers Rocher

        <Button adorn on:click={showSettings} slot="action">
            <Icon name="gear" />
        </Button>
    </Appbar>

    <Paper square card layout={Grid} lpadding="16px" lscrollable>
        <bijection-form>
            <Flex gap="16px" padding="0px">
                <IntegerInput
                    label="Size"
                    bind:value={size}
                    min={1}
                    placeholder="1,000"
                >
                    <Text adorn slot="start">n =</Text>
                </IntegerInput>
                <Select
                    label="Bijection"
                    bind:value={bijection}
                    options={bijectionOptions}
                />
                <description-area>
                    <Text>{bijection.description}</Text>
                </description-area>

                <Button
                    variant="fill"
                    color="primary"
                    on:click={showBijection}
                    disabled={inputIsValid === false}
                >
                    SHOW BIJECTION
                </Button>
            </Flex>
        </bijection-form>
    </Paper>
</Screen>
