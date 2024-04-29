// libs
import { NextSeo } from "next-seo";

// components
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function Home() {
    return (
        <>
            <NextSeo title="Antiquário do Feneme" />
            <Header />
            <NavBar />
            <Container style={{ border: "1px solid black" }}>
                <h1>Hello World</h1>
            </Container>
        </>
    );
}
