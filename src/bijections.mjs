import {Palette} from "./color.mjs"

const bijections = [
    {
        name: "Strike-slip",
        description: "Works on most partitions.",
        allowPartitionSize: (n) => true,
        randomPartitionMethod: (n, maxIterationCount) => ({
            name: "randomByPDCDSH",
            args: {
                n,
                maxIterationCount,
            },
        }),
        animate: async (ferrersDiagram) => {
            const {cut, move, paste} = ferrersDiagram

            const {blue, foreground, red} = Palette()

            await cut(-1, 1, 0, red, blue)
            await Promise.all([
                move(red, 0, 1),
                move(blue, -1, 0),
            ])
            await paste(red, blue, foreground)
        },
    },
    {
        name: "Shred-and-stretch",
        description: "Even partition ↦ Even partition",
        allowPartitionSize: (n) => n % 2 === 0,
        randomPartitionMethod: (n, maxIterationCount) => ({
            name: "randomByPDCDSH",
            args: {
                n,
                policy: "even",
                maxIterationCount,
            },
        }),
        animate: async (ferrersDiagram) => {
            const {move, paste, shred, stretch, transpose} = ferrersDiagram

            const {foreground} = Palette()
            const {blue, red} = Palette(0.75)

            await shred(foreground, red, blue)
            await move(red, 1, 0)
            await Promise.all([
                stretch(red, 0.5, 0.5),
                stretch(blue, 0.5, 0.5),
            ])
            await move(red, 0, 1)
            await paste(red, blue, foreground)
            await transpose(foreground)
        },
    },
    {
        name: "Cut-and-stretch",
        description: [
            "Self-conjugate partition",
            "Partition with distinct odd parts",
        ].join(" ↦ "),
        allowPartitionSize: (n) => n !== 2,
        randomPartitionMethod: (n, maxIterationCount) => ({
            name: "randomSelfConjugate",
            args: {
                n,
                maxIterationCount,
            },
        }),
        animate: async (ferrersDiagram) => {
            const {cut, move, paste, shift, stretch, transpose} = ferrersDiagram

            const {foreground} = Palette()
            const {blue, red} = Palette(0.75)

            await cut(-1, 1, 1, red, blue)
            await Promise.all([
                shift(blue, 1, -1, 0, 1),
                shift(red, 1, 0, -1, 1),
            ])
            await move(red, 0, -1)
            await transpose(red)
            await Promise.all([
                stretch(blue, 2, 1),
                stretch(red, 2, 1),
            ])
            await move(red, 1, 0)
            await paste(red, blue, foreground)
        },
    },
    {
        name: "Sylvester/Glaisher",
        description: "Odd partition ↦ Partition with distinct parts",
        allowPartitionSize: (n) => true,
        randomPartitionMethod: (n, maxIterationCount) => ({
            name: "randomByPDCDSH",
            args: {
                n,
                policy: "odd",
                maxIterationCount,
            },
        }),
        animate: async (ferrersDiagram) => {
            const {
                add,
                cut,
                move,
                paste,
                shift,
                shred,
                stretch,
                transpose,
            } = ferrersDiagram

            const {foreground} = Palette()
            const {blue, orange, purple, red} = Palette(0.5)

            const transformBlueComponent = async () => {
                await move(blue, -1, 0)
                await shift(blue, 1, -2, 0, 1)
                await shred(blue, blue, purple)
                await move(blue, 1, 0)
                await Promise.all([
                    stretch(blue, 0.5, 0.5),
                    stretch(purple, 0.5, 0.5),
                ])
                await move(purple, 0, 1)
                await paste(blue, purple, blue)
            }

            const transformRedComponent = async () => {
                await shred(red, red, orange)
                await move(red, 1, 0)
                await Promise.all([
                    stretch(red, 0.5, 1),
                    stretch(orange, 0.5, 1),
                ])
                await move(orange, 0, -1)
                await Promise.all([
                    shift(red, 1, 0, -1, 1),
                    shift(orange, 1, 0, -1, 1),
                ])
                await Promise.all([
                    transpose(red),
                    transpose(orange),
                ])
                await Promise.all([
                    stretch(red, 1, 0.5),
                    stretch(orange, 1, 0.5),
                ])
                await move(orange, 0, 1)
                await paste(red, orange, red)
            }

            await cut(-1, 2, 0, red, blue)
            await Promise.all([
                transformBlueComponent(),
                transformRedComponent(),
            ])
            await add(blue, red)
            await paste(blue, red, foreground)
        },
    },
]

export default bijections
