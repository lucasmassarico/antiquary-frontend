import React from "react";
import { Box, Typography } from "@mui/material";
import { DotsThreeOutline } from "phosphor-react";
import Image from "next/image";
import { Button } from "../Button";
import { useRouter } from "next/router";
import { Category } from "@/types";

interface ProductCardProps {
    id: number;
    title: string;
    imageSrc: string;
    imageAlt: string;
    price?: number;
    activated: boolean;
    stock_quantity: number;
    category?: Category;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    title,
    imageSrc,
    imageAlt,
    price,
    activated,
    stock_quantity,
    category,
}) => {
    const isActivated = activated && stock_quantity > 0;
    const isUnavailable = !isActivated;

    const router = useRouter();

    const handleViewProduct = () => {
        if (!isUnavailable) {
            router.push(`/product/${id}`); // Redireciona para a página do produto
        }
    };

    const discount = category?.discount || 0;

    const discountedPrice =
        price && discount > 0 ? price * ((100 - discount) / 100) : price;

    return (
        <Box
            onClick={handleViewProduct} // Evento de clique em todo o card
            sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #E0E0E0",
                overflow: "hidden",
                backgroundColor: "#fff",
                borderRadius: 2,
                maxHeight: "25rem",
                maxWidth: "15rem",
                opacity: isActivated ? 1 : 0.5,
                cursor: isUnavailable ? "not-allowed" : "pointer",
                position: "relative", // Para posicionar o badge de desconto
            }}
        >
            {/* Badge de Desconto */}
            {discount > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "#512da8",
                        color: "#fff",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                    }}
                >
                    {`${discount}% OFF`}
                </Box>
            )}
            {/* Imagem */}
            <Box
                sx={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "9rem",
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
            {/* Conteúdo */}
            <Box sx={{ overflow: "hidden", padding: 2 }}>
                {/* Título */}
                <Typography
                    variant="h6"
                    sx={{
                        height: "4rem",
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        fontSize: "1.2rem",
                    }}
                    title={title}
                >
                    {title}
                </Typography>
                {/* Preços */}
                <Box
                    sx={{
                        minHeight: "2.7rem",
                        display: "flex",
                        flexDirection: "column", // Mantém os preços em linhas separadas
                        alignItems: "flex-start",
                        paddingTop: "0.5rem",
                        justifyContent: "end",
                    }}
                >
                    {/* Preço Original Riscado */}
                    {discount > 0 && price && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#757575",
                                textDecoration: "line-through",
                                fontSize: "0.9rem",
                                margin: 0,
                                lineHeight: 0.5, // Reduz o espaçamento entre as linhas
                            }}
                        >
                            {`R$ ${price.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}`}
                        </Typography>
                    )}
                    {/* Preço com Desconto */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#FFA726",
                            marginTop: "0.2rem", // Reduz o espaçamento entre os preços
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                        }}
                    >
                        {discountedPrice
                            ? `R$ ${discountedPrice.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })}`
                            : ""}
                    </Typography>
                </Box>
                {/* Botão */}
                <Box sx={{ display: "grid", marginTop: "1rem" }}>
                    <Button
                        customVariant="productCard"
                        color={isUnavailable ? "secondary" : "primary"}
                        disabled={isUnavailable}
                        startIcon={
                            isUnavailable ? undefined : <DotsThreeOutline />
                        }
                    >
                        {isUnavailable ? "Indisponível" : "Ver Detalhes"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
