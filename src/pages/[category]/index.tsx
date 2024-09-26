// libs
import { useRouter } from "next/router";
import { api, staticFilesServer } from "@/lib/axios";
import { useEffect, useState } from "react";

// components
import { Container } from "@/components/Container";
import { ProductsContainer } from "@/components/ProductsContainer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryNotFound } from "@/components/CategoryNotFound";
import CircularProgress from "@mui/material/CircularProgress"; // Importando o spinner do MUI

// types
import { Category, Product } from "@/types";

export default function CategoryPage() {
    const { query } = useRouter();
    const categoryUrl = query?.category;

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [additionalProducts, setAdditionalProducts] = useState<Product[]>([]);
    const [errorCategory, setErrorCategory] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado de loading

    useEffect(() => {
        if (categoryUrl) {
            setErrorCategory(false);
            setLoading(true); // Inicia o loading
            api.get(`/categories/find/by_urlname/${categoryUrl}`)
                .then((response) => {
                    setCategory(response.data);
                })
                .catch((error: any) => {
                    console.error("Error fetching category:", error);
                    setErrorCategory(true);
                })
                .finally(() => setLoading(false)); // Termina o loading
        }
    }, [categoryUrl]);

    useEffect(() => {
        if (category?.id) {
            setLoading(true); // Inicia o loading
            api.get(`/products/find/by_category_id/${category?.id}`)
                .then((response) => {
                    setProducts(response.data);
                    if (response.data.length < 10) {
                        fetchAdditionalProducts([category.id]);
                    }
                })
                .catch((error: any) => {
                    console.error("Error fetching products:", error);
                })
                .finally(() => setLoading(false)); // Termina o loading
        }
    }, [category?.id]);

    const fetchAdditionalProducts = (excludeCategories) => {
        api.get(`/products/find/all`, {
            params: {
                excluded_categories: JSON.stringify(excludeCategories),
            },
        })
            .then((response) => {
                setAdditionalProducts(response.data);
            })
            .catch((error: any) => {
                console.error("Error fetching additional products:", error);
            });
    };

    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <>
            <Container>
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50vh",
                        }}
                    >
                        <CircularProgress />{" "}
                        {/* Mostrando o spinner enquanto carrega */}
                    </div>
                ) : errorCategory ? (
                    <CategoryNotFound />
                ) : (
                    <>
                        {products.length === 0 ? (
                            <p>Não há produtos cadastrados nesta categoria.</p>
                        ) : (
                            <ProductsContainer>
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        activated={product.activated}
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
                                        stock_quantity={product.stock_quantity}
                                    />
                                ))}
                            </ProductsContainer>
                        )}
                    </>
                )}
            </Container>
            {additionalProducts.length > 0 && (
                <>
                    <div
                        style={{
                            width: "1280px",
                            margin: "3rem auto 0 auto",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <h3>
                            De uma olhada em alguns outros produtos nossos...
                        </h3>
                    </div>
                    <Container>
                        <ProductsContainer>
                            {additionalProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    activated={product.activated}
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
                                    stock_quantity={product.stock_quantity}
                                />
                            ))}
                        </ProductsContainer>
                    </Container>
                </>
            )}
        </>
    );
}
