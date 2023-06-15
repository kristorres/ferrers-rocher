<script>
    import {
        Button,
        Flex,
        Grid,
        Icon,
        Modal,
        Paper,
        Screen,
        Select,
        Text,
        Titlebar,
        wsx,
    } from "@axel669/zephyr"

    import bijections from "./bijections.mjs"
    import BijectionScreen from "./comp/bijection-screen.svelte"
    import IntegerInput from "./comp/control/integer-input.svelte"
    import Settings, {theme} from "./comp/settings.svelte"

    const bijectionOptions = bijections.map(
        (bijection) => {
            const {name} = bijection

            return {
                label: name,
                value: bijection,
            }
        }
    )

    let bijectionScreen = null
    let settings = null

    let size = null
    let bijection = null

    $: inputIsValid = (size > 0 && bijection?.allowPartitionSize(size) === true)

    const showBijection = () => {
        bijectionScreen.show({
            input: {
                n: size,
                bijection,
            },
        })
    }
</script>

<style>
    :global([ws-x~="theme[light]"]) {
        --background: #daebfe;

        --primary: #2774ae;
        --primary-ripple: #2774ae60;
        --secondary: #ffb81c;
        --secondary-ripple: #ffb81c60;
    }
    :global([ws-x~="theme[dark]"]) {
        --background: #003b5c;

        --primary: #5dbfec;
        --primary-ripple: #5dbfec60;
        --secondary: #ffe47d;
        --secondary-ripple: #ffe47d60;
    }

    bijection-form {
        align-self: center;
        justify-self: center;
        width: min(100%, 360px);
    }
</style>

<svelte:body use:wsx={{theme: $theme, "@app": true}} />

<Screen>
    <Modal component={BijectionScreen} bind:this={bijectionScreen} />
    <Modal component={Settings} bind:this={settings} />

    <Paper
        card
        square
        scrollable
        layout={Grid}
        l-autoRow="initial"
        l-pad="16px"
    >
        <Titlebar fill color="primary" slot="header">
            <Text title slot="title">
                Ferrers Rocher
            </Text>

            <Button color={false} on:click={settings.show} slot="action">
                <Icon name="settings" t-sz="24px" />
            </Button>
        </Titlebar>

        <bijection-form>
            <Grid gap="16px" pad="0px">
                <IntegerInput
                    label="Size"
                    bind:value={size}
                    min={1}
                    placeholder="1,000"
                >
                    <Flex main="center" slot="start">
                        <Text>n&nbsp;=</Text>
                    </Flex>
                </IntegerInput>
                <Select
                    label="Bijection"
                    bind:value={bijection}
                    options={bijectionOptions}
                />
                <div use:wsx={{h: "36px"}}>
                    {#if bijection !== null}
                        <Text>{bijection.description}</Text>
                    {/if}
                </div>

                <Button
                    fill
                    color="primary"
                    t-sz="var(--text-size-normal)"
                    on:click={showBijection}
                    disabled={inputIsValid === false}
                >
                    SHOW BIJECTION
                </Button>
            </Grid>
        </bijection-form>
    </Paper>
</Screen>
