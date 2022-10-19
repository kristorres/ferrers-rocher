import {author, description, homepage, name} from "../package.json"

const app = {
    name: "Ferrers Rocher",
    author: author.name,
    twitter: "@ohayoukris",
    description,
    keywords: [
        "integer partitions",
        "bijections",
        "mathematics",
        "web app",
    ],
    themeColor: "#2774ae",
    favicon: (timestamp) => `images/${name}-favicon-${timestamp}.png`,
    iosIcon: (timestamp) => `images/${name}-ios-icon-${timestamp}.png`,
    url: homepage,
}

const viewportAttributes = [
    "width=device-width",
    "initial-scale=1",
    "minimum-scale=1",
    "maximum-scale=1",
]

function htmlTemplate(timestamp) {
    const favicon = `${app.url}/${app.favicon(timestamp)}`
    const iosIcon = `${app.url}/${app.iosIcon(timestamp)}`

    return (options) => `<!DOCTYPE html>
<html>
    <head>
        <title>${app.name}</title>

        <meta charset="UTF-8" />
        <meta name="viewport" content="${viewportAttributes.join(", ")}" />

        <meta name="author" content="${app.author}" />
        <meta name="description" content="${app.description}" />
        <meta name="keywords" content="${app.keywords.join(", ")}" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="${app.twitter}" />
        <meta name="twitter:title" content="${app.name}" />
        <meta name="twitter:description" content="${app.description}" />
        <meta name="twitter:image" content="${iosIcon}" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="${app.name}" />
        <meta property="og:description" content="${app.description}" />
        <meta property="og:image" content="${iosIcon}" />
        <meta property="og:url" content="${app.url}" />

        <meta name="theme-color" content="${app.themeColor}" />

        <link rel="icon" type="image/png" href="${favicon}" />
        <link rel="apple-touch-icon" type="image/png" href="${iosIcon}" />
    </head>
    <body>
        <script data-main src="${options.files.js[0].fileName}"></script>
    </body>
</html>
`
}

export default htmlTemplate
