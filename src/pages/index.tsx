// libs
import { NextSeo } from "next-seo";

// components
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { ProductsContainer } from "@/components/ProductsContainer";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <>
            <NextSeo title="Antiquário do Feneme" />
            <Header />
            <NavBar />
            <Container>
                <ProductsContainer>
                    <ProductCard
                        title="Produto 1"
                        imageSrc="/static/new_product.png"
                        imageAlt="Produto 1"
                        price={15500}
                    />
                    <ProductCard
                        title="Produto 2"
                        imageSrc="/static/new_product.png"
                        imageAlt="Produto 2"
                    />
                    <ProductCard
                        title="Produto 3"
                        imageSrc="/static/new_product.png"
                        imageAlt="Produto 3"
                    />
                    <ProductCard
                        title="Produto 4"
                        imageSrc="/static/new_product.png"
                        imageAlt="Produto 4"
                    />
                    <ProductCard
                        title="Produto 5"
                        imageSrc="/static/new_product.png"
                        imageAlt="Produto 5"
                    />
                    <ProductCard
                        title="Produto 6"
                        imageSrc="/static/new_product.png"
                        imageAlt="Produto 6"
                    />
                    <ProductCard
                        title="Produto 7"
                        imageSrc="/static/new_product.png"
                        imageAlt="Produto 7"
                        price={15500}
                    />
                </ProductsContainer>
            </Container>
            <Footer />
        </>
    );
}
