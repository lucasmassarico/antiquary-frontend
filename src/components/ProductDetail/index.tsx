import React, { useEffect, useState } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import { api } from "@/lib/axios";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import { Product } from "@/types";

interface ProductDetailProps {
    productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/find/by_id/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false);
        }
    };

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
            <Grid container spacing={4}>
                {/* Left Column: Image Gallery */}
                <Grid item xs={12} md={6}>
                    <ImageGallery product={product} />
                </Grid>

                {/* Right Column: Product Information */}
                <Grid item xs={12} md={6}>
                    <ProductInfo product={product} />
                </Grid>
            </Grid>

            {/* Product Description and Details */}
            <ProductTabs product={product} />

            {/* Related Products */}
            <RelatedProducts
                currentProductId={product.id}
                categoryId={product.id_category}
            />
        </Box>
    );
};

export default ProductDetail;
