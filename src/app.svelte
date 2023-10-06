<script>
    import {
        EntryButton,
        Flex,
        Grid,
        Icon,
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

    let size = null
    let bijection = null

    $: inputIsValid = (size > 0 && bijection?.allowPartitionSize(size) === true)
</script>

<style>
    :global([ws-x~="theme[light]"]) {
        --primary: #2774ae;
        --primary-ripple: #2774ae60;
        --secondary: #ffb81c;
        --secondary-ripple: #ffb81c60;
        --background: #daebfe;

        --font: Helvetica, Arial, sans-serif;
    }
    :global([ws-x~="theme[dark]"]) {
        --primary: #5dbfec;
        --primary-ripple: #5dbfec60;
        --secondary: #ffe47d;
        --secondary-ripple: #ffe47d60;
        --background: #003b5c;

        --font: Helvetica, Arial, sans-serif;
    }

    bijection-form {
        align-self: center;
        justify-self: center;
        width: min(100%, 360px);
    }
</style>

<svelte:body use:wsx={{theme: $theme, "@app": true}} />

<Screen>
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

            <EntryButton compact m="4px" component={Settings} slot="action">
                <Icon name="settings" t-sz="20px" />
            </EntryButton>
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
                <div ws-x="h[36px]">
                    {#if bijection !== null}
                        <Text>{bijection.description}</Text>
                    {/if}
                </div>

                <EntryButton
                    fill
                    color="primary"
                    t-sz="&text-size-normal"
                    component={BijectionScreen}
                    props={{input: {n: size, bijection}}}
                    disabled={inputIsValid === false}
                >
                    Show Bijection
                </EntryButton>
            </Grid>
        </bijection-form>
    </Paper>
</Screen>
