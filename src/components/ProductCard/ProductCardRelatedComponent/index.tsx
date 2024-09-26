import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Image from "next/image";
import { Product } from "@/types";
import { getImageUrl } from "@/helpers";
import { Button } from "@/components/Button";

interface ProductCardRelatedComponentProps {
    product: Product;
}

const ProductCardRelatedComponent: React.FC<
    ProductCardRelatedComponentProps
> = ({ product }) => {
    return (
        <Box key={product.id} p={1}>
            <Paper
                elevation={1}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                {/* Imagem sem padding */}
                <Box
                    position="relative"
                    width="100%"
                    height={200}
                    sx={{
                        overflow: "hidden",
                        display: "flex",
                    }}
                >
                    <Image
                        src={getImageUrl(product.image_thumbnail_name)}
                        alt={product.name}
                        fill
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            borderRadius: "5px 5px 0 0",
                        }}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </Box>

                {/* Conteúdo com padding */}
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            height: "3rem",
                            fontWeight: "700",
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: "#FFA726",
                            marginBottom: 2,
                        }}
                    >
                        {product.price
                            ? `R$ ${product.price.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })}`
                            : ""}
                    </Typography>

                    <Button
                        customVariant="productCard"
                        fullWidth
                        href={`/product/${product.id}`}
                    >
                        Ver Produto
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProductCardRelatedComponent;
