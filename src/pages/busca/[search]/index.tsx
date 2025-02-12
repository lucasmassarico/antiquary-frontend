// libs
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

// components
import ProductList from "@/components/ProductList";

// types
import { Product } from "@/types";
import { CategoryNotFound } from "@/components/CategoryNotFound";

export default function BuscaProducts() {
    const { query, push } = useRouter();

    const querySearch = query.search;

    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (querySearch) {
            setError(false);

            api.get(`/products/find/all/?query=${querySearch}`)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error: any) => {
                    console.error("Error fecthing products:", error);
                    setError(true);
                });
        }
    }, [querySearch]);

    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <>
            {error ? (
                <CategoryNotFound />
            ) : (
                <>
                    {products.length === 0 ? (
                        <CategoryNotFound />
                    ) : (
                        <ProductList products={products} />
                    )}
                </>
            )}
        </>
    );
}
