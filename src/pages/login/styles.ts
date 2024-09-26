import { styled } from "@/styles";

// Container para o form de login
export const ContainerLogin = styled("div", {
    width: "70%",
    height: "70%",
    margin: "0 auto",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
});

// Estilo para o formulário em si
export const Form = styled("form", {
    display: "flex",
    flexDirection: "column",
    paddingTop: "$4",
    // border: "2px solid black",
    width: "70%",
    height: "70%",
});

// Container do input e da label
export const InputContainer = styled("div", {
    position: "relative",
    display: "flex",
    justifyContent: "center",    marginBottom: "$6",
    width: "100%",
});

// Estilo do input
export const Input = styled("input", {
    width: "50%",
    padding: "$2 $3",
    fontSize: "$md",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.2s ease-in-out",

    "&:focus": {
        borderColor: "#000",
    },

    "&:focus + label": {
        transform: "translateY(-1.5rem)",
        fontSize: "0.75rem",
        color: "#000",
    },
});

// Estilo da label
export const Label = styled("label", {
    position: "absolute",
    left: "$36",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "white",
    borderRadius: "$lg",
    padding: "0 $2",
    color: "#aaa",
    pointerEvents: "none",
    transition: "all 0.2s ease-in-out",

    variants: {
        isActive: {
            true: {
                transform: "translateY(-1.5rem)",
                fontSize: "0.75rem",
                backgroundColor: "white",
                borderRadius: "$lg",
                color: "#000",
            },
        },
    },
});

export const ButtonContainer = styled("div", {
    display: "flex", // Adiciona o display flex
    justifyContent: "center", // Centraliza horizontalmente
});
