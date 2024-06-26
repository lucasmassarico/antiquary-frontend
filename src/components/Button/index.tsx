import { ComponentProps, ElementType } from "react";
import { styled } from "@/styles";

export const Button = styled("button", {
    all: "unset",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "$2",
    boxSizing: "border-box",
    minWidth: 120,
    padding: "0 $4",
    borderRadius: "$md",
    fontSize: "$md",
    fontWeight: "$regular",
    fontFamily: "$default",
    textAlign: "center",
    cursor: "pointer",
    transition: "150ms",

    svg: {
        width: "$5",
        height: "$5",
    },

    "&:disabled": {
        cursor: "not-allowed",
    },

    "&:focus": {
        boxShadow: "0 0 0 2px $color$gray100",
    },

    variants: {
        variant: {
            primary: {
                backgroundColor: "$greenTheme",
                color: "$lightWhite",

                "&:not(:disabled):hover": {
                    backgroundColor: "$lightOrange",
                },

                "&:disabled": {
                    background: "$gray200",
                    cursor: "not-allowed",
                },
            },
            productCard: {
                backgroundColor: "$greenTheme",
            },
        },

        size: {
            sm: {
                height: 38,
            },

            md: {
                height: 46,
            },
        },
    },

    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

export interface ButtonProps extends ComponentProps<typeof Button> {
    as?: ElementType;
}

Button.displayName = "Button";
