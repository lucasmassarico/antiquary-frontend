import React from "react";
import { Box, Typography } from "@mui/material";
import { DotsThreeOutline } from "phosphor-react";
import Image from "next/image";
import { Button } from "../Button";
import { useRouter } from "next/router";

interface ProductCardProps {
    id: number;
    title: string;
    imageSrc: string;
    imageAlt: string;
    price?: number;
    activated: boolean;
    stock_quantity: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    title,
    imageSrc,
    imageAlt,
    price,
    activated,
    stock_quantity,
}) => {
    const isActivated = activated && stock_quantity > 0;
    const isUnavailable = !isActivated;

    const router = useRouter();

    const handleViewProduct = () => {
        if (!isUnavailable) {
            router.push(`/product/${id}`); // Redireciona para a página do produto
        }
    };

    return (
        <Box
            sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #E0E0E0", // substitui $gray300
                overflow: "hidden",
                backgroundColor: "#fff", // substitui $white
                borderRadius: 2, // substitui $md
                maxHeight: "25rem",
                maxWidth: "15rem",
                opacity: isActivated ? 1 : 0.5, // comportamento ativado/desativado
            }}
        >
            <Box
                sx={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "9rem", // substitui $36
                }}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={150}
                    height={150}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    priority
                />
            </Box>
            <Box sx={{ overflow: "hidden", padding: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        height: "2.5rem", // substitui $10
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        height: "2rem", // substitui $4
                        margin: "1rem 0", // substitui $2
                    }}
                >
                    <Typography variant="h6" sx={{ color: "#FFA726" }}>
                        {price
                            ? `R$ ${price.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })}`
                            : ""}
                    </Typography>
                </Box>
                <Box sx={{ display: "grid", marginTop: "1rem" }}>
                    <Button
                        customVariant="productCard"
                        color={isUnavailable ? "secondary" : "primary"}
                        disabled={isUnavailable}
                        onClick={handleViewProduct}
                        startIcon={
                            isUnavailable ? undefined : <DotsThreeOutline />
                        }
                    >
                        {isUnavailable ? "Indisponível" : "Ver mais"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
