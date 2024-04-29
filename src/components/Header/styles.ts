import { styled } from "@/styles";

export const HeaderContainer = styled("header", {
    padding: "$1 $20 $1 $20",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "$lightOrange",
    color: "$lightWhite",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

    a: {
        display: "flex",
        alignItems: "center",
        gap: "$1",

        color: "$lightWhite",
    },
});

export const ButtonGroup = styled("div", {
    display: "flex",
    alignItems: "center",
    gap: "$4",
});

export const Icons = styled("span", {
    verticalAlign: "middle",
});
