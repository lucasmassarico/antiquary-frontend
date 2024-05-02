import { styled } from "@/styles";
import Link from "next/link";

export const FooterContainer = styled("div", {
    width: "100%",
    minHeight: "10rem",
    maxHeight: "20rem",
    backgroundColor: "$lightOrange",
    color: "$white",
    margin: "$16 0 $4 0",
});

export const FooterContent = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "$8",
    height: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
});

export const FooterColumn = styled("div", {
    padding: "$2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
});

export const ColumnTitle = styled("h3", {
    fontWeight: "$bold",
    fontSize: "$md",
});

export const ColumnItem = styled("span", {
    fontSize: "$xs",
});

export const ColumnItemLink = styled(Link, {
    textDecoration: "none",
    color: "$white",
    fontSize: "$sm",
    lineHeight: "$shorter",
});

export const ColumnItemWithIcon = styled(Link, {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "$white",
    fontSize: "$sm",
});
