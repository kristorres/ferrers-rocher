<script>
    import {css} from "svelte-doric"
    import {LightTheme} from "svelte-doric/theme"

    const custom = css`
        body {
            --background: #daebfe;

            --primary: #2774ae;
            --primary-ripple: #2774ae60;
            --secondary: #ffd100;
            --secondary-ripple: #ffd10060;
        }
    `
</script>

<LightTheme />
{@html custom}
