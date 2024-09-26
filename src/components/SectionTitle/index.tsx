import { Typography } from "@mui/material";
import { styled } from "@mui/system";

interface SectionTitleProps {
    children: React.ReactNode;
    marginTop?: number; // Prop opcional para o marginTop
}

const StyledTitle = styled(Typography)<{ marginTop?: number }>(
    ({ theme, marginTop }) => ({
        marginBottom: theme.spacing(4),
        marginTop: marginTop ? theme.spacing(marginTop) : 0, // Define o marginTop condicionalmente
        fontWeight: "bold",
        fontSize: "2rem",
        textAlign: "center",
        color: "#1976d2",
    })
);

const SectionTitle: React.FC<SectionTitleProps> = ({ children, marginTop }) => {
    return (
        <StyledTitle variant="h2" marginTop={marginTop}>
            {children}
        </StyledTitle>
    );
};

export default SectionTitle;
