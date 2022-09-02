<script>
    export let bijection

    import {onDestroy, onMount} from "svelte"
    import {DialogContent, Paper, TitleBar} from "svelte-doric"

    import createFerrersDiagram from "../state/ferrers-diagram.mjs"

    const λ = [21, 17, 13, 10, 5, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1]
    const ferrersDiagram = createFerrersDiagram(λ)

    const dotRadius = 4
    const latticeUnit = dotRadius * 3
    const offset = dotRadius * 2

    let height = window.innerHeight

    function dotStyle(dot) {
        return [
            `top: ${dot.y * latticeUnit + offset}px;`,
            `left: ${dot.x * latticeUnit + offset}px;`,
            `background-color: ${dot.color};`,
            `width: ${dotRadius * 2}px;`,
            `border-radius: ${dotRadius}px;`,
        ].join(" ")
    }

    function updateHeight() {
        height = window.innerHeight
    }

    onMount(
        () => window.addEventListener("resize", updateHeight)
    )

    onDestroy(
        () => window.removeEventListener("resize", updateHeight)
    )
</script>

<style>
    board {
        position: relative;
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
            {#each $ferrersDiagram as dot}
                <dot style={dotStyle(dot)} />
            {/each}
        </board>
    </Paper>
</DialogContent>
