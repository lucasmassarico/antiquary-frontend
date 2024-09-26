import React from "react";
import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends MuiButtonProps {
    customVariant?: "primary" | "productCard";
}

export const Button: React.FC<ButtonProps> = ({
    customVariant = "primary",
    ...props
}) => {
    return (
        <MuiButton
            {...props}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                minWidth: 120,
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 400,
                textAlign: "center",
                cursor: "pointer",
                transition: "150ms",
                backgroundColor:
                    customVariant === "primary" ? "#0B3F30" : "#0B3F30", // substitui greenTheme
                color: "#fefae0", // substitui lightWhite
                "&:not(:disabled):hover": {
                    backgroundColor: "#E39828", // substitui lightOrange
                },
                "&:disabled": {
                    backgroundColor: "#E0E0E0", // estilo para desabilitado, pode manter o cinza do MUI
                    cursor: "not-allowed",
                },
                svg: {
                    width: "20px",
                    height: "20px",
                },
                "&:focus": {
                    boxShadow: "0 0 0 2px #606c38", // substitui cornsilk
                },
            }}
        >
            {props.children}
        </MuiButton>
    );
};
