import {tweened} from "svelte/motion"

function createFerrersDiagram(λ) {
    const dots = []
    const partCount = λ.length

    for (let i = 0; i < partCount; i += 1) {
        for (let j = 0; j < λ[i]; j += 1) {
            dots.push({
                x: j,
                y: i,
                color: "gray",
            })
        }
    }

    const {subscribe} = tweened(
        dots,
        {
            duration: 1000,
        }
    )

    return {
        subscribe,
    }
}

export default createFerrersDiagram
