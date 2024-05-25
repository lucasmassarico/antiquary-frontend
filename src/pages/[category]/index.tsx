// libs
import { useRouter } from "next/router";
import { api, staticFilesServer } from "@/lib/axios";
import { useEffect, useState } from "react";

// components
import { Container } from "@/components/Container";
import { ProductsContainer } from "@/components/ProductsContainer";
import { ProductCard } from "@/components/ProductCard";

// types
import { Category, Product } from "@/types";

export default function CategoryPage() {
    const { query } = useRouter();
    const categoryUrl = query?.category;

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [errorCategory, setErrorCategory] = useState<boolean>(false);

    useEffect(() => {
        if (categoryUrl) {
            api.get(`/categories/find/by_urlname/${categoryUrl}`)
                .then((response) => {
                    setCategory(response.data);
                })
                .catch((error: any) => {
                    console.error("Error fetching category:", error);
                    setErrorCategory(true);
                });
        }
    }, [categoryUrl]);

    useEffect(() => {
        if (category?.id) {
            api.get(`/products/find/by_category_id/${category?.id}`)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error: any) => {
                    console.error("Error fetching products:", error);
                });
        }
    }, [category?.id]);

    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <>
            <Container>
                {errorCategory ? (
                    <p>Erro</p>
                ) : (
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
                )}
            </Container>
        </>
    );
}
