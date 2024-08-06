import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function ProductDetails() {
    const { query, push } = useRouter();
    const productId = query.id;
    const [product, setProduct] = useState<Product>();
    const [errorProduct, setErrorProduct] = useState<boolean>(false);

    useEffect(() => {
        if (productId) {
            setErrorProduct(false);
            api.get(`/products/find/by_id/${productId}`)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error: any) => {
                    console.error("Error fetching products:", error);
                    setErrorProduct(true);
                });
        }
    }, [productId]);

    console.log(product);

    return (
        <>
            <h1>Detalhes do produto</h1>
            <p>Id do produto: {productId}</p>

            <button onClick={() => push(`/product/${productId}/edit`)}>
                Edit
            </button>
        </>
    );
}
