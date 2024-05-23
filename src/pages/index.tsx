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
            setProducts(response.data);
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
