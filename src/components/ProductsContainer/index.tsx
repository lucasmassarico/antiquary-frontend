import { ComponentProps, ElementType } from "react";
import { styled } from "@/styles";

export const ProductsContainer = styled("div", {
    width: "100%",
    maxWidth: "1280px",
    margin: "$4 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "$6",
});
