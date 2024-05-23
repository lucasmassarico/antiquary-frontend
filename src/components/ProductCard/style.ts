import { styled } from "@/styles";

export const ProductContainer = styled("div", {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    border: "1px  solid $gray300",
    overflow: "hidden",
    backgroundColor: "$white",
    borderRadius: "$md",

    maxHeight: "25rem",
    maxWidth: "15rem",
});

export const ProductImage = styled("div", {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "$36",

    ".productImage": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
});

export const ProductBody = styled("div", {
    overflow: "hidden",
    padding: "$2",
});

export const ProductTitle = styled("div", {
    height: "$10",
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    h3: {
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",

        fontSize: "$md",
    },
});

export const ProductPrice = styled("div", {
    height: "$4",
    margin: "$2 0",
    h2: {
        fontSize: "$xl",
        color: "$lightOrange",
    },
});

export const ButtonContainer = styled("div", {
    display: "grid",
    marginTop: "$4",
});
