import { ComponentProps, ElementType } from "react";
import { styled } from "@/styles";

export const Container = styled("div", {
    width: "1280px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

export interface ContainerProps extends ComponentProps<typeof Container> {
    as?: ElementType;
}
