// libs
import Link from "next/link";

// styles
import { HeaderContainer, ButtonGroup } from "./styles";

// images & icons
import { Phone, Envelope, InstagramLogo, FacebookLogo } from "phosphor-react";

export const Header = () => {
    const iconSize = 24;

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
