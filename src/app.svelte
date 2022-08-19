<script>
    import {AppStyle, Baseline as baseline} from "svelte-doric"

    import Dashboard from "./comp/dashboard.svelte"
    import theme from "./state/theme.mjs"
</script>

<AppStyle {baseline} theme={$theme} />

<Dashboard />
