import { styled } from "@/styles";

export const Container = styled("div", {
    width: "100%",
    display: "flex",
    justifyContent: "center",
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
