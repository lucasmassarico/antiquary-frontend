// libs
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api, staticFilesServer } from "@/lib/axios";

// components
import { Container } from "@/components/Container";
import { ProductsContainer } from "@/components/ProductsContainer";
import { ProductCard } from "@/components/ProductCard";

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
            <Container>
                {error ? (
                    <CategoryNotFound />
                ) : (
                    <>
                        {products.length === 0 ? (
                            <CategoryNotFound />
                        ) : (
                            <ProductsContainer>
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        title={toTitleCase(product.name)}
                                        imageSrc={`${staticFilesServer}${
                                            product.image_thumbnail_name.startsWith(
                                                "/"
                                            )
                                                ? ""
                                                : "/"
                                        }${product.image_thumbnail_name}`}
                                        imageAlt={product.name}
                                        price={product.price}
                                    />
                                ))}
                            </ProductsContainer>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}
