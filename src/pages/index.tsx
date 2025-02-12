// libs
import { NextSeo } from "next-seo";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Product } from "@/types";

// components
import ProductList from "@/components/ProductList";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("products/find/all").then((response) => {
            // Ordena os produtos antes de definir o estado
            const sortedProducts = response.data.sort(
                (a: Product, b: Product) => {
                    const aIsInactive = !a.activated || a.stock_quantity === 0;
                    const bIsInactive = !b.activated || b.stock_quantity === 0;

                    if (aIsInactive && !bIsInactive) return 1; // Move `a` para o final
                    if (!aIsInactive && bIsInactive) return -1; // Mantém `b` no final
                    return 0; // Mantém a ordem original se ambos estiverem na mesma condição
                }
            );
            setProducts(sortedProducts);
        });
    }, []);

    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <>
            <NextSeo title="Antiquário" />
            <ProductList products={products} />
        </>
    );
}
