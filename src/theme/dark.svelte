<script>
    import {DarkTheme, css} from "svelte-doric"

    const custom = css`
        body {
            --background: #003b5c;

            --primary: #5dbfec;
            --primary-light: #b5e4f7;
            --primary-ripple: #5dbfec60;
            --secondary: #ffe47d;
            --secondary-ripple: #ffe47d60;
        }
    `
</script>

<DarkTheme />
{@html custom}
