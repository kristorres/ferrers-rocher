<script>
    export let value

    import {Input} from "@axel669/zephyr"

    const {min = null, max = null, ...otherProps} = $$props
    const validInputRegex = /^[-]?\d*$/

    const minString = (min === null)
        ? null
        : `${min}`
    const maxString = (max === null)
        ? null
        : `${max}`

    let rawInput = (value === null)
        ? ""
        : `${value}`

    $: updateValue = () => {
        if (
            validInputRegex.test(rawInput) === false
            || rawInput.length === 0
            || rawInput === "-"
        ) {
            value = null
            return
        }

        const newValue = parseInt(rawInput)

        if (
            (min !== null && newValue < min)
            || (max !== null && newValue > max)
        ) {
            value = null
            return
        }

        value = newValue
    }
    $: updateValue()
</script>

<Input.Number
    bind:value={rawInput}
    min={minString}
    max={maxString}
    {...otherProps}
>
    <slot name="start" />
    <slot name="end" />
</Input.Number>
