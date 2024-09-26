// libs
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Fade } from "@mui/material";
import { useRouter } from "next/router";

// styles
import { HeaderContainer, ButtonGroup } from "./styles";

// images & icons
import { Phone, Envelope, InstagramLogo, FacebookLogo } from "phosphor-react";

// Importa o componente ProfileMenu
import ProfileMenu from "@/components/ProfileMenu";

const Cookies = require("js-cookie");

export const Header = () => {
    const iconSize = 24;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const checkLoginStatus = () => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
    };

    useEffect(() => {
        checkLoginStatus();

        const handleLogin = () => checkLoginStatus();
        const handleLogout = () => checkLoginStatus();

        window.addEventListener("login", handleLogin);
        window.addEventListener("logout", handleLogout);

        return () => {
            window.removeEventListener("login", handleLogin);
            window.removeEventListener("logout", handleLogout);
        };
    }, []);

    return (
        <HeaderContainer>
            <ButtonGroup>
                <Link
                    href="https://wa.me/5514991974654"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                >
                    <Phone size={iconSize} />
                    <span>+55 14 99197-4654</span>
                </Link>
                <Link
                    href="mailto:suporte@teste.com"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                >
                    <Envelope size={iconSize} />
                    <span>suporte@teste.com</span>
                </Link>
            </ButtonGroup>
            <ButtonGroup>
                {isLoggedIn ? (
                    <ProfileMenu />
                ) : (
                    <Link href="/login" style={{ textDecoration: "none" }}>
                        <Button
                            variant="outlined"
                            style={{
                                textTransform: "none",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                borderColor: "white",
                                color: "white",
                                padding: "0",
                            }}
                        >
                            Login
                        </Button>
                    </Link>
                )}

                <Link href="/sobrenos" style={{ textDecoration: "none" }}>
                    <span>Fale Conosco</span>
                </Link>
                <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                >
                    <InstagramLogo size={iconSize} />
                </Link>
                <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                >
                    <FacebookLogo size={iconSize} />
                </Link>
            </ButtonGroup>
        </HeaderContainer>
    );
};
