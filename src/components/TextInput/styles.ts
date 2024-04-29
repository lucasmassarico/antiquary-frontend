import { styled } from "@/styles";

export const TextInputContainer = styled("div", {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    border: "1px solid $gray400",
    borderRadius: "$md",
    backgroundColor: "$white",

    "&:focus-within": {
        borderColor: "$black",
    },

    "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
    },

    "input::-webkit-calendar-picker-indicator": {
        filter: "invert(100%) brightness(30%)",
    },

    "& .suffix": {
        cursor: "pointer",
    },

    variants: {
        size: {
            sm: {
                padding: "$1 $2",
            },

            md: {
                padding: "$2 $3",
            },
        },
    },

    defaultVariants: {
        size: "md",
    },
});

export const Input = styled("input", {
    width: "$60",
    border: 0,
    backgroundColor: "transparent",
    fontFamily: "$default",
    fontWeight: "$regular",
    fontSize: "$md",
    color: "$black",

    "&:focus": {
        outline: 0,
    },

    "&:disabled": {
        cursor: "not-allowed",
    },

    "&::placeholder": {
        color: "$gray400",
    },
});
