import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { Product } from "@/types";
import { toTitleCase } from "@/helpers";

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá, estou interessado no produto ${product.name}`;

    return (
        <Box>
            {/* Product Title */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {toTitleCase(product.name)}
            </Typography>

            {/* Price Information */}
            <Box my={2}>
                <Typography
                    variant="h4"
                    sx={{ color: "#FFA726", fontWeight: 700 }}
                >
                    {product.price
                        ? `R$ ${product.price.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })}`
                        : ""}
                </Typography>
                {/* Add discount or installment information if needed */}
            </Box>

            {/* Additional Information */}
            <Typography variant="body1">
                <b>Estoque: </b>
                {product.stock_quantity > 0
                    ? product.stock_quantity
                    : "Indisponível"}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Action Buttons */}
            <Button
                variant="contained"
                color="success"
                size="large"
                fullWidth
                href={whatsappLink}
                target="_blank"
                sx={{ mb: 2 }}
            >
                Entrar em Contato via WhatsApp
            </Button>
        </Box>
    );
};

export default ProductInfo;
