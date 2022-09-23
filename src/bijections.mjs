import Color from "./color.mjs"

const gray = Color(128, 128, 128)

const bijections = [
    {
        name: "Strike-slip",
        description: "Works on most partitions.",
        allowPartitionSize: (n) => true,
        randomPartitionMethod: (n) => ({
            name: "randomByPDCDSH",
            args: {
                n,
            },
        }),
        animate: async (ferrersDiagram) => {
            const {cut, move, paste} = ferrersDiagram

            const color1 = Color(126, 48, 177)
            const color2 = Color(102, 152, 255)

            await cut(-1, 1, 0, color1, color2)
            await Promise.all([
                move(color1, 0, 1),
                move(color2, -1, 0),
            ])
            await paste(color1, color2, gray)
        },
    },
    {
        name: "Shred-and-stretch",
        description: "Even partition ↦ Even partition",
        allowPartitionSize: (n) => n % 2 === 0,
        randomPartitionMethod: (n) => ({
            name: "randomByPDCDSH",
            args: {
                n,
                policy: "even",
            },
        }),
        animate: async (ferrersDiagram) => {
            const {move, paste, shred, stretch, transpose} = ferrersDiagram

            const color1 = Color(154, 29, 125, 0.5)
            const color2 = Color(102, 255, 204, 0.5)

            await shred(gray, color1, color2)
            await move(color1, 1, 0)
            await Promise.all([
                stretch(color1, 0.5, 0.5),
                stretch(color2, 0.5, 0.5),
            ])
            await move(color1, 0, 1)
            await paste(color1, color2, gray)
            await transpose(gray)
        },
    },
    {
        name: "Cut-and-stretch",
        description: [
            "Self-conjugate partition",
            "Partition with distinct odd parts",
        ].join(" ↦ "),
        allowPartitionSize: (n) => n !== 2,
        randomPartitionMethod: (n) => ({
            name: "randomSelfConjugate",
            args: {
                n,
            },
        }),
        animate: async (ferrersDiagram) => {
            const {cut, move, paste, shift, stretch, transpose} = ferrersDiagram

            const color1 = Color(168, 32, 133, 0.5)
            const color2 = Color(73, 146, 184, 0.5)

            await cut(-1, 1, 1, color1, color2)
            await Promise.all([
                shift(color2, 1, -1, 0, 1),
                shift(color1, 1, 0, -1, 1),
            ])
            await move(color1, 0, -1)
            await transpose(color1)
            await Promise.all([
                stretch(color2, 2, 1),
                stretch(color1, 2, 1),
            ])
            await move(color1, 1, 0)
            await paste(color1, color2, gray)
        },
    },
    {
        name: "Sylvester/Glaisher",
        description: "Odd partition ↦ Partition with distinct parts",
        allowPartitionSize: (n) => true,
        randomPartitionMethod: (n) => ({
            name: "randomByPDCDSH",
            args: {
                n,
                policy: "odd",
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

            const color1 = Color(204, 204, 1, 0.5)
            const color2 = Color(167, 0, 0, 0.5)

            const transformComponent1 = async () => {
                const color1a = Color(50, 51, 255, 0.5)
                const color1b = Color(1, 204, 52, 0.5)

                await move(color1, -1, 0)
                await shift(color1, 1, -2, 0, 1)
                await shred(color1, color1a, color1b)
                await move(color1a, 1, 0)
                await Promise.all([
                    stretch(color1a, 0.5, 0.5),
                    stretch(color1b, 0.5, 0.5),
                ])
                await move(color1b, 0, 1)
                await paste(color1a, color1b, color1)
            }

            const transformComponent2 = async () => {
                const color2a = Color(204, 0, 0, 0.5)
                const color2b = Color(52, 255, 204, 0.5)

                await shred(color2, color2a, color2b)
                await move(color2a, 1, 0)
                await Promise.all([
                    stretch(color2a, 0.5, 1),
                    stretch(color2b, 0.5, 1),
                ])
                await move(color2b, 0, -1)
                await Promise.all([
                    shift(color2a, 1, 0, -1, 1),
                    shift(color2b, 1, 0, -1, 1),
                ])
                await Promise.all([
                    transpose(color2a),
                    transpose(color2b),
                ])
                await Promise.all([
                    stretch(color2a, 1, 0.5),
                    stretch(color2b, 1, 0.5),
                ])
                await move(color2b, 0, 1)
                await paste(color2a, color2b, color2)
            }

            await cut(-1, 2, 0, color2, color1)
            await Promise.all([
                transformComponent1(),
                transformComponent2(),
            ])
            await add(color1, color2)
            await paste(color1, color2, gray)
        },
    },
]

export default bijections
