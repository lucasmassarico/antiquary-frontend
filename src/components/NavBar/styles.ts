import { styled } from "@/styles";

export const NavContainer = styled("nav", {
    maxWidth: "1280px",
    border: "2px solid black",
    padding: "$8 $8",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

export const ButtonGroup = styled("div", {
    display: "flex",
    gap: "$2",
});
