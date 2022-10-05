<script>
    import {LightTheme, css} from "svelte-doric"

    const custom = css`
        body {
            --background: #daebfe;

            --primary: #2774ae;
            --primary-light: #86d1f2;
            --primary-ripple: #2774ae60;
            --secondary: #ffd100;
            --secondary-ripple: #ffd10060;
        }
    `
</script>

<LightTheme />
{@html custom}
