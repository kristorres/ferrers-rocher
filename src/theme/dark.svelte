<script>
    import {DarkTheme, css} from "svelte-doric"

    const custom = css`
        body {
            --background: #003b5c;

            --primary: #86d1f2;
            --primary-ripple: #86d1f260;
            --secondary: #ffe47d;
            --secondary-ripple: #ffe47d60;
        }
    `
</script>

<DarkTheme />
{@html custom}
