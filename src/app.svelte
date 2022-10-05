<script>
    import {AppStyle, Baseline as baseline} from "svelte-doric"

    import Dashboard from "./comp/dashboard.svelte"
    import {theme} from "./comp/settings.svelte"
</script>

<AppStyle {baseline} theme={$theme} />

<Dashboard />
