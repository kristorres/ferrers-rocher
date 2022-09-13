import sort from "@axel669/array-sort"

import {Err} from "../comm/safe.mjs"

const {PI: π, floor, log, random, sqrt} = Math

const partitionPolicies = {
    unrestricted: {
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

function invalidPartitionPolicyError(name) {
    const validValues = Object.keys(restrictions).map(
        (value) => `"${value}"`
    )
    const message = [
        `Invalid policy: "${name}"`,
        `(must be one of the following: ${validValues.join(", ")}).`,
    ].join(" ")

    return new Error(message)
}

function isPositiveInteger(n) {
    return (
        typeof n === "number"
        && isNaN(n) === false
        && Number.isInteger(n) === true
        && n > 0
    )
}

function partsAreDistinct(λ) {
    return λ.length === (new Set(λ)).size
}

function randomByFristedt(n, policy = "unrestricted", maxIterationCount = 1e4) {
    if (isPositiveInteger(n) === false) {
        return new Error("n is not a positive integer.")
    }

    const partitionPolicy = partitionPolicies[policy]
    if (partitionPolicy === undefined) {
        return invalidPartitionPolicyError(policy)
    }
    if (partitionPolicy.allowSize(n) === false) {
        return new Error(`Invalid value for n due to policy: ${n}.`)
    }

    if (isPositiveInteger(maxIterationCount) === false) {
        return new Error("maxIterationCount is not a positive integer.")
    }

    for (let i = 0; i < maxIterationCount; i += 1) {
        let λ = []

        for (let k = 1; k <= n; k += 1) {
            const U = random()

            if (partitionPolicy.allowPart(k) === true && U > 0) {
                const Zₖ = floor((-sqrt(6 * n) * log(U)) / (π * k))
                λ = [...λ, ...Array(Zₖ).fill(k)]
            }
        }

        const size = λ.reduce(
            (sum, part) => sum + part,
            0
        )
        if (size === n) {
            λ.reverse()
            return λ
        }
    }

    return new Error(`Failed after ${maxIterationCount} iterations.`)
}

function randomWithDistinctParts(
    n,
    policy = "unrestricted",
    maxIterationCount = 1e4
) {
    if (isPositiveInteger(n) === false) {
        return new Error("n is not a positive integer.")
    }

    const partitionPolicy = partitionPolicies[policy]
    if (partitionPolicy === undefined) {
        return invalidPartitionPolicyError(policy)
    }
    if (partitionPolicy.allowSizeForDistinctParts(n) === false) {
        return new Error(`Invalid value for n due to policy: ${n}.`)
    }

    if (isPositiveInteger(maxIterationCount) === false) {
        return new Error("maxIterationCount is not a positive integer.")
    }

    for (let i = 0; i < maxIterationCount; i += 1) {
        const λ = []
        let largestPartAllowed = n

        while (largestPartAllowed > 0) {
            const part = floor(random() * largestPartAllowed) + 1

            if (partitionPolicy.allowPart(part) === true) {
                λ.push(part)
                largestPartAllowed -= part
            }
        }

        if (partsAreDistinct(λ) === true) {
            λ.sort(
                sort.reverse(
                    sort.number
                )
            )

            return λ
        }
    }

    return new Error(`Failed after ${maxIterationCount} iterations.`)
}

function randomSelfConjugate(n, maxIterationCount = 1e4) {
    const λ = randomWithDistinctParts(n, "odd", maxIterationCount)
    if (Err(λ) === true) {
        return λ
    }

    const μ = []

    for (let i = 0; i < λ.length; i += 1) {
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
    randomByFristedt,
    randomSelfConjugate,
    randomWithDistinctParts,
}

export default IntegerPartition
