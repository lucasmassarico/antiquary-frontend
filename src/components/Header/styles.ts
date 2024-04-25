import { styled } from "@/styles";

export const HeaderContainer = styled("header", {
    padding: "$6",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid black",
});

export const ButtonGroup = styled("div", {
    display: "flex",
    gap: "$2",
});
