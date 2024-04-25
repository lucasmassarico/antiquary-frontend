import {
    colors,
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    radii,
    space,
} from "./tokens";
import { createStitches, defaultThemeMap } from "@stitches/react";

export const {
    styled,
    css,
    globalCss,
    keyFrames,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    themeMap: {
        ...defaultThemeMap,
        height: "space",
        width: "space",
    },

    theme: {
        colors,
        fontSizes,
        fonts,
        fontWeights,
        lineHeights,
        radii,
        space,
    },
});
