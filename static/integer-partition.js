const {PI: π, exp, floor, log, pow, random, sqrt} = Math

const policies = {
    unrestricted: {
        part: (k) => k,
        allowSize: (n) => true,
        allowSizeForDistinctParts: (n) => true,
    },
    even: {
        part: (k) => k * 2,
        allowSize: (n) => n % 2 === 0,
        allowSizeForDistinctParts: (n) => n % 2 === 0,
    },
    odd: {
        part: (k) => k * 2 - 1,
        allowSize: (n) => true,
        allowSizeForDistinctParts: (n) => n !== 2,
    },
}

function Err(value) {
    return value instanceof Error
}

function isPositiveInteger(n) {
    return (
        typeof n === "number"
        && isNaN(n) === false
        && Number.isInteger(n) === true
        && n > 0
    )
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

function fallback(options) {
    return {
        ...options,
        policy: options.policy ?? "unrestricted",
        maxIterationCount: options.maxIterationCount ?? 1e4,
    }
}

function randomByFristedt(n, options = {}) {
    const modifiedOptions = fallback(options)

    const error = validateArgs({n, ...modifiedOptions})
    if (error !== null) {
        return error
    }

    const {policy: policyName, maxIterationCount} = modifiedOptions
    const policy = policies[policyName]

    for (let i = 0; i < maxIterationCount; i += 1) {
        let λ = []

        let partSequenceIndex = 1
        let k = policy.part(partSequenceIndex)

        while (k <= n) {
            const U = random()

            if (U > 0) {
                const Zₖ = floor((-sqrt(6 * n) * log(U)) / (π * k))
                λ = [...λ, ...Array(Zₖ).fill(k)]
            }

            partSequenceIndex += 1
            k = policy.part(partSequenceIndex)
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

function randomByPDCDSH(n, options = {}) {
    const modifiedOptions = fallback(options)

    const error = validateArgs({n, ...modifiedOptions})
    if (error !== null) {
        return error
    }

    const {policy: policyName, maxIterationCount} = modifiedOptions
    const policy = policies[policyName]

    for (let i = 0; i < maxIterationCount; i += 1) {
        let λ = []

        let partSequenceIndex = 2
        let k = policy.part(partSequenceIndex)

        while (k <= n) {
            const U = random()

            if (U > 0) {
                const Zₖ = floor((-sqrt(6 * n) * log(U)) / (π * k))
                λ = [...λ, ...Array(Zₖ).fill(k)]
            }

            partSequenceIndex += 1
            k = policy.part(partSequenceIndex)
        }

        const firstHalfSize = λ.reduce(
            (sum, part) => sum + part,
            0
        )
        const m = n - firstHalfSize
        const minPart = policy.part(1)
        const U = random()

        if (
            m >= 0
            && m % minPart === 0
            && U < exp(-π * m * minPart / sqrt(6 * n))
        ) {
            λ = [...Array(m / minPart).fill(minPart), ...λ]
            λ.reverse()
            return λ
        }
    }

    return new Error(`Failed after ${maxIterationCount} iterations.`)
}

function randomWithDistinctParts(n, options = {}) {
    const modifiedOptions = fallback(options)

    const error = validateArgs({n, ...modifiedOptions}, true)
    if (error !== null) {
        return error
    }

    const {policy: policyName, maxIterationCount} = modifiedOptions
    const policy = policies[policyName]

    const x = exp(-π / sqrt(12 * n))

    for (let i = 0; i < maxIterationCount; i += 1) {
        const λ = []

        let partSequenceIndex = 1
        let k = policy.part(partSequenceIndex)

        while (k <= n) {
            const U = random()
            const p = pow(x, k) / (1 + pow(x, k))

            if (U < p) {
                λ.push(k)
            }

            partSequenceIndex += 1
            k = policy.part(partSequenceIndex)
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
    randomByPDCDSH,
    randomSelfConjugate,
    randomWithDistinctParts,
}

onmessage = (event) => {
    const {name: method, args} = event.data
    const {n, policy, maxIterationCount = 1e4} = args

    const arg1 = (method === "randomSelfConjugate")
        ? maxIterationCount
        : {policy, maxIterationCount}

    const λ = IntegerPartition[method](n, arg1)

    if (Err(λ) === true) {
        postMessage({ok: false, error: λ.message})
        return
    }

    postMessage({ok: true, partition: λ})
}
