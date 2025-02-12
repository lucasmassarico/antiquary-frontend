import React, { useEffect, useState, useCallback } from "react";
import {
    Grid,
    Box,
    CircularProgress,
    Breadcrumbs,
    Link,
    Typography,
    Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { api } from "@/lib/axios";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import { Product, Category } from "@/types";
import { toTitleCase } from "@/helpers";

interface ProductDetailProps {
    productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProduct = useCallback(async () => {
        try {
            const response = await api.get(`/products/find/by_id/${productId}`);
            setProduct(response.data);
            fetchCategory(response.data.id_category);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    const fetchCategory = async (categoryId: number) => {
        try {
            const response = await api.get(
                `/categories/find/by_id/${categoryId}`
            );
            setCategory(response.data);
        } catch (error) {
            console.error("Failed to fetch category:", error);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [fetchProduct, productId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <Box px={{ xs: 2, md: 4 }} py={4}>
            <Box mb={2}>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={
                        <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />
                    } // Reduz o tamanho do ícone
                >
                    <Typography color="textPrimary">Você está em: </Typography>

                    <Link color="inherit" href="/">
                        Início
                    </Link>
                    {category && (
                        <Link
                            color="inherit"
                            href={`/${category.url_name.toLowerCase()}`}
                        >
                            {toTitleCase(category.name)}
                        </Link>
                    )}
                </Breadcrumbs>
                <Divider />
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ImageGallery product={product} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <ProductInfo product={product} category={category} />
                </Grid>
            </Grid>

            <ProductTabs product={product} />

            <RelatedProducts
                currentProductId={product.id}
                categoryId={product.id_category}
            />
        </Box>
    );
};

export default ProductDetail;
