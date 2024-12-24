<script>
    export let label
    export let value
    export let min
    export let max
    export let step
    export let disabled = false

    import {Flex} from "@axel669/zephyr"
    import RangeSlider from "svelte-range-slider-pips"

    let sliderValues = [value]

    $: value = sliderValues[0]
</script>

<style>
    slider-label {
        font-size: 12px;
        -webkit-text-size-adjust: none;
        color: var(--text-color-normal);
        -webkit-user-select: none;
        user-select: none;
    }
    slider-label.disabled {
        color: var(--text-color-secondary);
    }
</style>

<Flex cross="stretch" p="0px">
    <slider-label class:disabled>{label}</slider-label>

    <RangeSlider
        bind:values={sliderValues}
        {min}
        {max}
        {step}
        range="min"
        float
        hoverable={disabled === false}
        pips
        first="label"
        last="label"
        {disabled}
    />
</Flex>
