<script>
    export let value

    import {TextInput} from "svelte-doric"

    const {type, ...otherProps} = $$props
    const validInputRegex = /^[-]?\d*$/

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

        value = parseInt(rawInput)
    }
    $: updateValue()
</script>

<TextInput type="number" bind:value={rawInput} {...otherProps}>
    <slot name="start">
        <div />
    </slot>
</TextInput>
