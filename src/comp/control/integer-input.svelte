<script>
    export let label
    export let value
    export let min = null
    export let max = null
    export let disabled = false

    const validInputRegex = /^[-]?\d*$/

    let control = null
    let currentInput = (value === null)
        ? ""
        : `${value}`

    $: value = (currentInput.length === 0 || currentInput === "-")
        ? null
        : parseInt(currentInput)

    function focus() {
        control.focus()
    }

    function handleInput(event) {
        const newInput = event.target.value

        if (validInputRegex.test(newInput) === false) {
            event.target.value = currentInput
            return
        }
        if (newInput.length === 0) {
            currentInput = newInput
            return
        }
        if (newInput === "-") {
            if (min === null || min < 0) {
                currentInput = newInput
                return
            }

            event.target.value = currentInput
            return
        }

        const newValue = parseInt(newInput)
        if (
            (min !== null && newValue < min)
            || (max !== null && newValue > max)
        ) {
            event.target.value = currentInput
            return
        }

        currentInput = `${newValue}`
    }

    function handleKeyPress(event) {
        const {key} = event

        if (key !== "ArrowUp" && key !== "ArrowDown") {
            return
        }

        event.preventDefault()

        const currentValue = value ?? 0
        const increment = (key === "ArrowUp")
            ? 1
            : -1
        const newValue = currentValue + increment

        if (min !== null && newValue < min) {
            currentInput = `${min}`
            return
        }
        if (max !== null && newValue > max) {
            currentInput = `${max}`
            return
        }

        currentInput = `${newValue}`
    }
</script>

<style>
    fieldset {
        border: 1px solid var(--text-secondary);
        border-radius: 4px;
        padding: 8px;
        margin: 0;
    }
    fieldset:not(.disabled) {
        cursor: text;
    }
    fieldset:focus-within:not(.disabled) {
        border-color: var(--primary);
    }
    fieldset:focus-within:not(.disabled) > legend {
        color: var(--primary);
    }

    legend {
        font-size: 12px;
        line-height: 0;
        color: var(--text-secondary);
        user-select: none;
    }

    input {
        background-color: transparent;
        font-size: var(--text-size);
        color: var(--text-normal);
        border-width: 0px;
        padding: 0 2px;
        margin: 0;
        width: 100%;
    }
    input:focus {
        outline: none;
    }
</style>

<fieldset tabindex="-1" class:disabled on:focus={focus}>
    <legend>{label}</legend>

    <input
        type="text"
        value={currentInput}
        on:input={handleInput}
        on:keydown={handleKeyPress}
        bind:this={control}
        {disabled}
    />
</fieldset>
