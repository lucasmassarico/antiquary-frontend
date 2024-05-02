import { styled } from "@/styles";
import Link from "next/link";

export const FooterContainer = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "$4",
    width: "100%",
    minHeight: "10rem",
    backgroundColor: "$lightOrange",
    color: "$white",
    margin: "$16 0 $4 0",
});

export const FooterColumn = styled("div", {
    margin: "0 auto",
    padding: "$2",
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
});

export const ColumnItemWithIcon = styled(Link, {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "$white",
    fontSize: "$sm",
});
