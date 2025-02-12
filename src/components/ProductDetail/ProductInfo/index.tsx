import React from "react";
import {
    Box,
    Typography,
    Button,
    Divider,
    Tooltip,
    IconButton,
    Chip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { AttachMoney, Store, LocalShipping } from "@mui/icons-material";
import { Product, Category } from "@/types";
import { toTitleCase } from "@/helpers";
import { useRouter } from "next/router";

interface ProductInfoProps {
    product: Product;
    category: Category | null;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, category }) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const router = useRouter();

    const productLink = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá, estou interessado no produto ${product.name}. Segue o link: ${productLink}`;

    // Calcular o desconto e o preço com desconto
    const discount = category?.discount || 0;

    const discountedPrice =
        product.price && discount > 0
            ? product.price * ((100 - discount) / 100)
            : product.price;

    return (
        <Box>
            {/* Título do Produto */}
            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 600, color: "rgb(66, 70, 77)" }}
            >
                {toTitleCase(product.name)}
            </Typography>

            {/* Seção de Detalhes do Produto */}
            <Box
                my={2}
                sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: discount > 0 ? 0 : 2,
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2,
                    backgroundColor: "#f9f9f9",
                    overflow: "hidden",
                }}
            >
                {/* Banner de Desconto */}
                {discount > 0 && (
                    <Box
                        sx={{
                            backgroundColor: "#512da8",
                            color: "#fff",
                            padding: "0.5rem",
                            textAlign: "center",
                            borderRadius: "0 0 1rem 1rem",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {`${discount}% OFF`}
                        </Typography>
                    </Box>
                )}

                {/* Conteúdo com Padding */}
                <Box p={2}>
                    {/* Preço */}
                    <Box>
                        {/* Preço Original Riscado */}
                        {discount > 0 && (
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#757575",
                                    textDecoration: "line-through",
                                    fontSize: "1rem",
                                }}
                            >
                                {product.price
                                    ? `R$ ${product.price.toLocaleString(
                                          "pt-BR",
                                          {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                          }
                                      )}`
                                    : ""}
                            </Typography>
                        )}
                        {/* Preço com Desconto */}
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="h3"
                                sx={{ color: "#73c300", fontWeight: 700 }}
                            >
                                {discountedPrice
                                    ? `R$ ${discountedPrice.toLocaleString(
                                          "pt-BR",
                                          {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                          }
                                      )}`
                                    : ""}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Informações adicionais de pagamento */}
                    <Typography
                        variant="body2"
                        sx={{ color: "#757575", mt: 1 }}
                    >
                        ou em até 12x no cartão sem juros
                    </Typography>

                    {/* Frete */}
                    <Box display="flex" alignItems="center" mt={2}>
                        <LocalShipping sx={{ color: "#757575", mr: 1 }} />
                        <Typography variant="body1" sx={{ color: "#757575" }}>
                            Frete
                        </Typography>
                        <Tooltip title="O frete varia de acordo com a região. Para mais informações, entre em contato com o vendedor.">
                            <IconButton
                                sx={{ ml: 1 }}
                                aria-label="Informações sobre o frete"
                                disableRipple
                                disableFocusRipple
                            >
                                <InfoIcon
                                    fontSize="small"
                                    sx={{ color: "#757575" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* Estoque */}
                    <Box display="flex" alignItems="center" mt={2}>
                        <Store
                            sx={{
                                color:
                                    product.stock_quantity > 0
                                        ? "green"
                                        : "red",
                                mr: 1,
                            }}
                        />
                        <Chip
                            label={
                                product.stock_quantity > 0
                                    ? `Em estoque (${product.stock_quantity} unidades)`
                                    : "Esgotado"
                            }
                            color={
                                product.stock_quantity > 0 ? "success" : "error"
                            }
                            variant="outlined"
                            sx={{ fontSize: "1rem", height: "32px" }}
                        />
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Botão de Ação */}
            <Button
                variant="contained"
                size="large"
                fullWidth
                href={product.stock_quantity > 0 ? whatsappLink : ""} // Só define o link se o produto estiver em estoque
                target="_blank"
                sx={{
                    mb: 2,
                    backgroundColor:
                        product.stock_quantity > 0 ? "#73c300" : "#cccccc", // Muda a cor se estiver desabilitado
                    fontSize: "1rem",
                }}
                disabled={product.stock_quantity === 0} // Desabilita o botão se estiver fora de estoque
            >
                <WhatsAppIcon sx={{ mr: 1 }} />
                Entrar em Contato via WhatsApp
            </Button>
        </Box>
    );
};

export default ProductInfo;
