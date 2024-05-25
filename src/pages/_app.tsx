import { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import Head from "next/head";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Category } from "@/types";

globalStyles();

export default function App({
    Component,
    pageProps: { ...pageProps },
}: AppProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        api.get<Category[]>("categories/find/all")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch categories:", error);
            });
    }, []);

    return (
        <>
            <Head>
                <title>Antiquário</title>
            </Head>
            <Header />
            <NavBar />
            <Component {...pageProps} />
            <Footer categories={categories} />
        </>
    );
}
