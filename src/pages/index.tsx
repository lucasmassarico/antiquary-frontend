// libs
import { NextSeo } from "next-seo";
import { api, staticFilesServer } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Product } from "@/types";

// components
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { ProductsContainer } from "@/components/ProductsContainer";

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
            <Container>
                <ProductsContainer>
                    {products.map((product) => (
                        <ProductCard
                            id={product.id}
                            activated={product.activated}
                            stock_quantity={product.stock_quantity}
                            key={product.id}
                            title={toTitleCase(product.name)}
                            imageSrc={`${staticFilesServer}${
                                product.image_thumbnail_name.startsWith("/")
                                    ? ""
                                    : "/"
                            }${product.image_thumbnail_name}`}
                            imageAlt={product.name}
                            price={product.price}
                        />
                    ))}
                </ProductsContainer>
            </Container>
        </>
    );
}
