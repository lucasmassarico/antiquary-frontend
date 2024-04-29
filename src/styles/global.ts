import { globalCss } from ".";

export const globalStyles = globalCss({
    "*": {
        margin: 0,
        padding: 0,
    },

    body: {
        backgroundColor: "$white",
        color: "$gray900",
        "-webkit-font-smoothing": "antialiased",
    },

    "body, input, textarea, button": {
        fontFamily: "$default",
        fontWeight: "$regular",
    },
});
