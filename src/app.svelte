<script>
    import {
        Button,
        EntryButton,
        Flex,
        Grid,
        Modal,
        Paper,
        Screen,
        Select,
        Text,
        Titlebar,
        wsx,
    } from "@axel669/zephyr"

    import BijectionScreen from "$comp/bijection-screen.svelte"
    import IntegerInput from "$comp/control/integer-input.svelte"
    import Icon from "$comp/icon.svelte"
    import Settings, {theme} from "$comp/settings.svelte"

    import bijections from "./bijections.mjs"

    const bijectionOptions = bijections.map(
        (bijection) => ({
            label: bijection.name,
            value: bijection,
        })
    )

    let bijectionScreen = null

    let size = null
    let bijection = null

    $: inputIsValid = (size > 0 && bijection?.allowPartitionSize(size) === true)

    const showBijection = async () => {
        if (inputIsValid === false) {
            return
        }

        document.activeElement.blur()
        await bijectionScreen.show({input: {n: size, bijection}})
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
    />
</svelte:head>

<style>
    :global([ws-x~="@@theme:light"]) {
        --primary: #2774ae;
        --primary-ripple: #2774ae60;
        --secondary: #ffb81c;
        --secondary-ripple: #ffb81c60;
        --background: #daebfe;

        --font: Helvetica, Arial, sans-serif;
    }
    :global([ws-x~="@@theme:dark"]) {
        --primary: #5dbfec;
        --primary-ripple: #5dbfec60;
        --secondary: #ffe47d;
        --secondary-ripple: #ffe47d60;
        --background: #003b5c;

        --font: Helvetica, Arial, sans-serif;
    }

    :global(body) {
        --range-handle-inactive: var(--primary);
        --range-handle-focus: var(--primary);
        --range-handle-border: var(--primary);
        --range-range: var(--primary-ripple);
        --range-range-inactive: var(--primary-ripple);
        --range-pip-active: var(--text-color-normal);
        --range-pip-hover: var(--text-color-normal);
    }
</style>

<svelte:body use:wsx={{"@@theme": $theme, "@@app": true}} />

<Screen>
    <Modal component={BijectionScreen} bind:this={bijectionScreen} />

    <Paper card square scrollable layout={Grid} l-autoRow="initial" l-p="16px">
        <Titlebar
            fill
            color="@primary"
            gr.cols="max-content minmax(0px, 1fr) max-content"
            no-select
            cur="default"
            slot="header"
        >
            <Text title t.wt="700" slot="title">
                Ferrers Rocher
            </Text>

            <EntryButton
                compact
                ground
                m="4px"
                component={Settings}
                slot="action"
            >
                 <Icon name="settings" t.sz="20px" />
            </EntryButton>
        </Titlebar>

        <form
            ws-x="[w min(100%, 360px)]"
            style="place-self: center"
            on:submit|preventDefault|stopPropagation={showBijection}
        >
            <Grid gap="16px" p="0px">
                <IntegerInput
                    label="Size"
                    bind:value={size}
                    min={1}
                    placeholder="1,000"
                >
                    <Flex main="center" h="100%" slot="start">
                        <Text t.sz="@text-size-normal">n&nbsp;=</Text>
                    </Flex>
                </IntegerInput>
                <Select
                    label="Bijection"
                    bind:value={bijection}
                    options={bijectionOptions}
                />
                <div ws-x="[h 36px]">
                    {#if bijection !== null}
                        <Text>{bijection.description}</Text>
                    {/if}
                </div>

                <Button
                    ground
                    fill
                    color="@primary"
                    t.sz="@text-size-normal"
                    on:click={showBijection}
                    disabled={inputIsValid === false}
                >
                    SHOW BIJECTION
                </Button>
            </Grid>
        </form>
    </Paper>
</Screen>
