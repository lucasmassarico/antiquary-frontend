import { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import Head from "next/head";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

globalStyles();

export default function App({
    Component,
    pageProps: { ...pageProps },
}: AppProps) {
    return (
        <>
            <Head>
                <title>Antiquário</title>
            </Head>
            <Header />
            <NavBar />
            <Component {...pageProps} />;
            <Footer
                categories={[
                    "Mesas",
                    "Sofás",
                    "Sofás",
                    "Sofás",
                    "Sofás",
                    "Sofás",
                    "dfgdf",
                    "Sofás",
                    "Sofás",
                    "Sofás",
                    "gfdSofás",
                    "Sofás",
                    "gfdg",
                    "Sofás",
                    "Sofás",
                    "Sofás",
                    "Sofásdf",
                    "Sofás",
                ]}
            />
        </>
    );
}
