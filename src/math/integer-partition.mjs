import sort from "@axel669/array-sort"

import {Err} from "../comm/safe.mjs"

const {PI: π, floor, log, random, sqrt} = Math

const policies = {
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

function invalidPolicyError(name) {
    const validValues = Object.keys(policies).map(
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

function validateArgs(args, partsMustBeDistinct = false) {
    const {n, policy: policyName, maxIterationCount} = args

    if (isPositiveInteger(n) === false) {
        return new Error("n is not a positive integer.")
    }

    const policy = policies[policyName]
    if (policy === undefined) {
        return invalidPolicyError(policyName)
    }

    const allowSize = (partsMustBeDistinct === true)
        ? policy.allowSizeForDistinctParts
        : policy.allowSize
    if (allowSize(n) === false) {
        return new Error(`Invalid value for n due to policy: ${n}.`)
    }

    if (isPositiveInteger(maxIterationCount) === false) {
        return new Error("maxIterationCount is not a positive integer.")
    }

    return null
}

function randomByFristedt(n, options = {}) {
    const {
        policy = "unrestricted",
        maxIterationCount = 1e4,
    } = options

    const error = validateArgs({n, ...options})
    if (error !== null) {
        return error
    }

    for (let i = 0; i < maxIterationCount; i += 1) {
        let λ = []

        for (let k = 1; k <= n; k += 1) {
            const U = random()

            if (policies[policy].allowPart(k) === true && U > 0) {
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

function randomWithDistinctParts(n, options = {}) {
    const {
        policy = "unrestricted",
        maxIterationCount = 1e4,
    } = options

    const error = validateArgs({n, ...options}, true)
    if (error !== null) {
        return error
    }

    for (let i = 0; i < maxIterationCount; i += 1) {
        const λ = []
        let largestPartAllowed = n

        while (largestPartAllowed > 0) {
            const part = floor(random() * largestPartAllowed) + 1

            if (policies[policy].allowPart(part) === true) {
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
    const λ = randomWithDistinctParts(n, {policy: "odd", maxIterationCount})
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
