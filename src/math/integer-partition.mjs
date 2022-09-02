import sort from "@axel669/array-sort"

import {Err} from "../comm/safe.mjs"

const {PI: π, floor, log, random, sqrt} = Math

const restrictions = {
    none: {
        allowPart: (part) => true,
        allowSize: (n) => true,
        allowSizeForDistinctParts: (n) => true,
    },
    even: {
        allowPart: (part) => part % 2 === 0,
        allowSize: (n) => n % 2 === 0,
        allowSizeForDistinctParts: (n) => n % 2 === 0,
    },
    odd: {
        allowPart: (part) => part % 2 === 1,
        allowSize: (n) => true,
        allowSizeForDistinctParts: (n) => n !== 2,
    },
}

function invalidRestrictionError(type) {
    const validValues = Object.keys(restrictions).map(
        (value) => `"${value}"`
    )
    const message = [
        `Invalid restriction: "${type}"`,
        `(must be one of the following: ${validValues.join(", ")}).`,
    ].join(" ")

    return new Error(message)
}

function isPositiveInteger(n) {
    return (
        typeof n !== "number"
        || isNaN(n) === true
        || Number.isInteger(n) === false
        || n <= 0
    )
}

function partsAreDistinct(λ) {
    return λ.length === (new Set(λ)).size
}

function random(n, partRestriction = "none") {
    if (isPositiveInteger(n) === false) {
        return new Error("n is not a positive integer.")
    }

    const restriction = restrictions[partRestriction]
    if (restriction === undefined) {
        return invalidRestrictionError(partRestriction)
    }
    if (restriction.allowSize(n) === false) {
        return new Error(`Invalid value for n due to restriction: ${n}.`)
    }

    let λ = []

    while (true) {
        for (let i = 1; i <= n; i += 1) {
            const U = random()

            if (restriction.allowPart(i) === true && U > 0) {
                const Zᵢ = floor((-sqrt(6 * n) * log(U)) / (π * i))
                for (let j = 0; j < Zᵢ; j += 1) {
                    λ.push(i)
                }
            }
        }

        const size = λ.reduce(
            (sum, part) => sum + part,
            0
        )
        if (size === n) {
            break
        }

        λ = []
    }

    λ.reverse()

    return λ
}

function randomWithDistinctParts(n, partRestriction = "none") {
    if (isPositiveInteger(n) === false) {
        return new Error("n is not a positive integer.")
    }

    const restriction = restrictions[partRestriction]
    if (restriction === undefined) {
        return invalidRestrictionError(partRestriction)
    }
    if (restriction.allowSizeForDistinctParts(n) === false) {
        return new Error(`Invalid value for n due to restriction: ${n}.`)
    }

    let λ = []

    while (true) {
        let largestPartAllowed = n

        while (largestPartAllowed > 0) {
            const part = floor(random() * largestPartAllowed) + 1

            if (restriction.allowPart(part) === true) {
                λ.push(part)
                largestPartAllowed -= part
            }
        }

        if (partsAreDistinct(λ) === true) {
            break
        }

        λ = []
    }

    λ.sort(
        sort.reverse(
            sort.number
        )
    )

    return λ
}

function randomSelfConjugate(n) {
    const λ = randomWithDistinctParts(n, "odd")
    if (Err(λ) === true) {
        return λ
    }

    const μ = []

    for (let i = 0; i < n; i += 1) {
        const minor = floor(λ[i] / 2)
        const major = λ[i] - minor

        for (let j = 0; j < major; j += 1) {
            if (i === 0) {
                μ.push(1)
            }
            else {
                μ[i + j] += 1
            }
        }

        μ[i] += minor
    }

    return μ
}

const IntegerPartition = {
    random,
    randomSelfConjugate,
    randomWithDistinctParts,
}

export default IntegerPartition
