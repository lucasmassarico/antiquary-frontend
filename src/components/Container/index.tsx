import { ComponentProps, ElementType } from "react";
import { styled } from "@/styles";

export const Container = styled("div", {
    maxWidth: "1280px",
    width: "100%",
    margin: "$2 auto",
    padding: "$4",
    display: "flex",
    overflow: "hidden",
    backgroundColor: "$gray50",
    borderRadius: "$md",
});
