<script>
    export let close
    export let input

    import {onDestroy, onMount} from "svelte"
    import {
        Alert,
        Button,
        CircleSpinner as Spinner,
        Flex,
        Grid,
        Icon,
        Modal,
        Paper,
        Screen,
        Text,
        Titlebar,
    } from "@axel669/zephyr"

    import {
        animationSpeed,
        dotRadius,
        maxIterationCount,
    } from "./settings.svelte"
    import FerrersDiagram from "$/state/ferrers-diagram.mjs"

    const {n, bijection} = input

    const worker = new Worker("integer-partition.js")

    const latticeUnit = $dotRadius * 3
    const offset = $dotRadius * 2

    let alert = null

    let λ = null
    let ferrersDiagram = null

    const dotStyle = (dot) => {
        const {red, green, blue, alpha} = dot.color

        return [
            `top: ${dot.y * latticeUnit + offset}px;`,
            `left: ${dot.x * latticeUnit + offset}px;`,
            `background-color: rgba(${red}, ${green}, ${blue}, ${alpha});`,
            `width: ${$dotRadius * 2}px;`,
            `border-radius: ${$dotRadius}px;`,
        ].join(" ")
    }

    const pause = (numberOfSeconds) => {
        return new Promise(
            (resolve) => setTimeout(resolve, numberOfSeconds * 1000)
        )
    }

    const startAnimation = async () => {
        ferrersDiagram = FerrersDiagram(λ, $animationSpeed)

        await pause(1)
        await bijection.animate(ferrersDiagram)
    }

    onMount(
        () => {
            worker.postMessage(
                bijection.randomPartitionMethod(n, $maxIterationCount)
            )

            worker.onmessage = async (event) => {
                const result = event.data

                if (result.ok === false) {
                    await alert.show({title: "Error", message: result.error})
                    close()
                    return
                }

                λ = result.partition
                await startAnimation()
            }
        }
    )

    onDestroy(
        () => worker.terminate()
    )
</script>

<style>
    board {
        position: relative;
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    dot {
        position: absolute;
        aspect-ratio: 1;
    }
</style>

<Screen width="100%">
    <Modal component={Alert} bind:this={alert} />

    <Paper card square l-main="center" l-cross="center" l-pad="0px">
        <Titlebar fill color="primary" slot="header">
            <Text title slot="title">
                {bijection.name}
            </Text>
        </Titlebar>

        {#if ferrersDiagram === null}
            <Spinner size="200px" />
        {:else}
            <board>
                {#each $ferrersDiagram as dot}
                    <dot style={dotStyle(dot)} />
                {/each}
            </board>
        {/if}

        <Grid cols="1fr 1fr" slot="footer">
            <Button
                color="secondary"
                t-sz="var(--text-size-normal)"
                on:click={startAnimation}
                disabled={ferrersDiagram === null}
            >
                <Flex direction="row" pad="0px">
                    <Icon name="player-track-prev-filled" />
                    Restart
                </Flex>
            </Button>
            <Button
                color="secondary"
                t-sz="var(--text-size-normal)"
                on:click={close}
            >
                Close
            </Button>
        </Grid>
    </Paper>
</Screen>
