// libs
import { NextSeo } from "next-seo";

// components
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";

export default function Home() {
    return (
        <>
            <NextSeo title="Antiquário do Feneme" />
            <Header />
            <NavBar />
            <h1>Hello World</h1>
            <Button>Botão</Button>
        </>
    );
}
