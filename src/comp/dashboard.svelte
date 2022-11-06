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

    $: inputIsValid = (size > 0 && bijection.allowPartitionSize(size) === true)

    async function showBijection() {
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

    async function showSettings() {
        document.activeElement.blur()
        await navigation.openStack(Settings)
    }
</script>

<style>
    bijection-form {
        width: min(100%, 360px);
        margin: 0 auto;
    }
    description-area {
        width: 100%;
        height: 36px;
    }
</style>

<Screen bind:this={navigation}>
    <AppBar slot="title">
        Ferrers Rocher

        <Adornment slot="action">
            <Button on:click={showSettings}>
                <Icon name="gear" />
            </Button>
        </Adornment>
    </AppBar>

    <Paper square card layout={Flex} lpadding="16px" lscrollable>
        <bijection-form>
            <Flex gap="16px" padding="0px">
                <IntegerInput
                    label="Size"
                    bind:value={size}
                    min={1}
                    placeholder="1,000"
                >
                    <Adornment slot="start">
                        <Text adorn>n =</Text>
                    </Adornment>
                </IntegerInput>
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
                    on:click={showBijection}
                    disabled={inputIsValid === false}
                >
                    SHOW BIJECTION
                </Button>
            </Flex>
        </bijection-form>
    </Paper>
</Screen>
