import React from "react";
import { useRouter } from "next/router";
import ProductDetail from "@/components/ProductDetail";

const ProductPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    // Wait for the id to be available
    if (!id) {
        return <div>Loading...</div>;
    }

    return <ProductDetail productId={Number(id)} />;
};

export default ProductPage;
