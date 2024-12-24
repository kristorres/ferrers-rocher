<script>
    export let value

    import {Input} from "@axel669/zephyr"

    const {min = null, max = null, placeholder = null, ...otherProps} = $$props
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

<Input
    type="number"
    bind:value={rawInput}
    {...otherProps}
    i-ws-x="[t.sz @text-size-normal]"
    i-min={minString}
    i-max={maxString}
    i-placeholder={placeholder}
>
    <slot name="start" />
    <slot name="end" />
</Input>
