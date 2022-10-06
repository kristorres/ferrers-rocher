<script>
    import {AppStyle, Baseline as baseline} from "svelte-doric"

    import Dashboard from "./comp/dashboard.svelte"
    import {theme} from "./comp/dashboard/settings.svelte"
</script>

<AppStyle {baseline} theme={$theme} />

<Dashboard />
