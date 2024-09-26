import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { api } from "@/lib/axios";
import { Product } from "@/types";
import { CustomSlider } from "./CustomSlider";
import ProductCardRelatedComponent from "@/components/ProductCard/ProductCardRelatedComponent";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface RelatedProductsProps {
    currentProductId: number;
    categoryId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
    currentProductId,
    categoryId,
}) => {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchRelatedProducts();
    }, [categoryId]);

    const fetchRelatedProducts = async () => {
        try {
            const response = await api.get(
                `products/find/by_category_id/${categoryId}`
            );
            const related = response.data.filter(
                (p: Product) => p.id !== currentProductId
            );
            setRelatedProducts(related);
        } catch (error) {
            console.error("Failed to fetch related products:", error);
        }
    };

    const settings = {
        dots: false,
        infinite: false, // Somente torna infinito se houver mais de 4 produtos
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <Box mt={6}>
            <Typography variant="h5" gutterBottom>
                Produtos Relacionados
            </Typography>
            {relatedProducts.length > 0 ? (
                <CustomSlider {...settings}>
                    {relatedProducts.map((product) => (
                        <ProductCardRelatedComponent
                            key={product.id}
                            product={product}
                        />
                    ))}
                </CustomSlider>
            ) : (
                <Typography>Não há produtos relacionados.</Typography>
            )}
        </Box>
    );
};

export default RelatedProducts;
