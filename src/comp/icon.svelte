<svelte:options immutable />

<script>
    export let name

    import {wsx} from "@axel669/zephyr"
</script>

<icon class="ti ti-{name}" use:wsx={$$restProps} />
