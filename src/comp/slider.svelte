<script>
    export let label
    export let value
    export let min
    export let max
    export let step
    export let disabled = false

    import {Flex} from "svelte-doric"
    import RangeSlider from "svelte-range-slider-pips"

    let sliderValues = [value]

    $: value = sliderValues[0]
</script>

<style>
    :global(body) {
        --range-handle-inactive: var(--primary);
        --range-handle-focus: var(--primary);
        --range-handle-border: var(--primary);
        --range-pip-active: var(--text-normal);
        --range-pip-hover: var(--text-normal);
    }

    slider-label {
        font-size: 12px;
        -webkit-text-size-adjust: none;
        color: var(--primary);
        user-select: none;
    }
    slider-label.disabled {
        color: var(--text-secondary);
    }
</style>

<Flex gap="0px" padding="0px">
    <slider-label class:disabled>{label}</slider-label>

    <RangeSlider
        bind:values={sliderValues}
        {min}
        {max}
        {step}
        float
        hoverable={disabled === false}
        pips
        first="label"
        last="label"
        {disabled}
    />
</Flex>
