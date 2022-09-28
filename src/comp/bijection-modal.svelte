<script>
    export let input
    export let close

    import {onDestroy, onMount} from "svelte"
    import {
        Alert,
        Button,
        DialogContent,
        Grid,
        HexagonSpinner as Spinner,
        Icon,
        Paper,
        TitleBar,
        dialog,
    } from "svelte-doric"

    import createFerrersDiagram from "../state/ferrers-diagram.mjs"

    const {n, bijection} = input

    const worker = new Worker("integer-partition.js")

    const dotRadius = 4
    const latticeUnit = dotRadius * 3
    const offset = dotRadius * 2

    let height = window.innerHeight

    let λ = null
    let ferrersDiagram = null

    function dotStyle(dot) {
        const {red, green, blue, alpha} = dot.color

        return [
            `top: ${dot.y * latticeUnit + offset}px;`,
            `left: ${dot.x * latticeUnit + offset}px;`,
            `background-color: rgba(${red}, ${green}, ${blue}, ${alpha});`,
            `width: ${dotRadius * 2}px;`,
            `border-radius: ${dotRadius}px;`,
        ].join(" ")
    }

    function pause(numberOfSeconds) {
        return new Promise(
            (resolve) => setTimeout(resolve, numberOfSeconds * 1000)
        )
    }

    async function startAnimation() {
        ferrersDiagram = createFerrersDiagram(λ)
        await pause(1)
        await bijection.animate(ferrersDiagram)
    }

    function updateHeight() {
        height = window.innerHeight
    }

    onMount(
        () => {
            window.addEventListener("resize", updateHeight)

            worker.postMessage(bijection.randomPartitionMethod(n))

            worker.onmessage = async (event) => {
                const result = event.data

                if (result.ok === false) {
                    close()
                    await dialog.show(
                        Alert,
                        {
                            title: "Error",
                            message: result.error,
                            icon: "triangle-exclamation",
                            persistent: true,
                        }
                    )
                    return
                }

                λ = result.partition
                await startAnimation()
            }
        }
    )

    onDestroy(
        () => {
            window.removeEventListener("resize", updateHeight)
            worker.terminate()
        }
    )
</script>

<style>
    board {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid var(--text-normal);
        overflow: hidden;
    }
    dot {
        position: absolute;
        aspect-ratio: 1;
    }
</style>

<DialogContent
    top={`${height / 2}px`}
    left="50%"
    originX="50%"
    originY={`${(height - 8) / 2}px`}
    width="calc(100vw - 8px)"
    height={`${height - 8}px`}
>
    <Paper card>
        <TitleBar compact slot="title">
            {bijection.name}
        </TitleBar>
        <board>
            {#if ferrersDiagram === null}
                <Spinner size={240} />
            {:else}
                {#each $ferrersDiagram as dot}
                    <dot style={dotStyle(dot)} />
                {/each}
            {/if}
        </board>
        <Grid cols="1fr 1fr" slot="action">
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
        </Grid>
    </Paper>
</DialogContent>
