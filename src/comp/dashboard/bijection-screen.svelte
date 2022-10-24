<script>
    export let input

    import {onDestroy, onMount} from "svelte"
    import {
        Alert,
        Button,
        Flex,
        Grid,
        HexagonSpinner as Spinner,
        Icon,
        Paper,
        Screen,
        TitleBar,
        dialog,
    } from "svelte-doric"

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

    let navigation = null

    let λ = null
    let ferrersDiagram = null

    function close() {
        navigation.close()
    }

    function dotStyle(dot) {
        const {red, green, blue, alpha} = dot.color

        return [
            `top: ${dot.y * latticeUnit + offset}px;`,
            `left: ${dot.x * latticeUnit + offset}px;`,
            `background-color: rgba(${red}, ${green}, ${blue}, ${alpha});`,
            `width: ${$dotRadius * 2}px;`,
            `border-radius: ${$dotRadius}px;`,
        ].join(" ")
    }

    function pause(numberOfSeconds) {
        return new Promise(
            (resolve) => setTimeout(resolve, numberOfSeconds * 1000)
        )
    }

    async function startAnimation() {
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
                    await dialog.show(
                        Alert,
                        {
                            title: "Error",
                            message: result.error,
                            icon: "triangle-exclamation",
                            persistent: true,
                        }
                    )
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

<Screen full bind:this={navigation}>
    <TitleBar compact slot="title">
        {bijection.name}
    </TitleBar>
    <Paper square layout={Flex} lcenter lpadding="0px">
        {#if ferrersDiagram === null}
            <Spinner size={200} />
        {:else}
            <board>
                {#each $ferrersDiagram as dot}
                    <dot style={dotStyle(dot)} />
                {/each}
            </board>
        {/if}
    </Paper>
    <Paper square flat layout={Grid} lcols="1fr 1fr" slot="footer">
        <Button
            color="secondary"
            on:tap={startAnimation}
            disabled={ferrersDiagram === null}
        >
            <Icon name="backward-fast" />
            RESTART
        </Button>
        <Button color="secondary" on:tap={close}>
            CLOSE
        </Button>
    </Paper>
</Screen>
