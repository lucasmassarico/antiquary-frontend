import { styled } from "@/styles";
import { Button } from "../Button";

export const CarouselContainer = styled("div", {
    position: "relative",
    width: "100%",
    overflow: "hidden",
});

export const SlideContainer = styled("div", {
    display: "flex",
    transition: "transform 0.5s ease",
});

export const Slide = styled("div", {
    minWidth: "100%",
    minHeight: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

export const Image = styled("img", {
    width: "100%",
    height: "300px",
    objectFit: "contain",
});

export const CarouselButton = styled("button", {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "10px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
});

export const PrevButton = styled(CarouselButton, {
    left: 0,
});

export const NextButton = styled(CarouselButton, {
    right: 0,
});
