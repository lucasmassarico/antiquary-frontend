import { styled } from "@/styles";

export const Container = styled("div", {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "$7",
    borderBottom: "1px solid $gray100",

    ".logoContainer": {
        display: "flex",
        alignItems: "center",
        gap: "$3",
        fontSize: "$2xl",

        color: "$greenTheme",
    },
});

export const NavContainer = styled("nav", {
    width: "1280px",
    padding: "$8 $8",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

export const ButtonGroup = styled("div", {
    display: "flex",
    gap: "$2",
});
