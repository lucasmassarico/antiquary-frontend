// libs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// components
import { Button } from "../Button";
import { TextInput } from "../TextInput";

// styles
import { Container, NavContainer, ButtonGroup } from "./styles";

// images & icons
import logoArmChair from "@/assets/armchair.svg";
import { MagnifyingGlass } from "phosphor-react";
import { Heart } from "phosphor-react";

export const NavBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            router.push(`/busca/${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleIconClick = () => {
        handleSearch();
    };

    return (
        <Container>
            <NavContainer>
                <Link
                    href="/"
                    style={{ textDecoration: "none" }}
                    className="logoContainer"
                >
                    <Image
                        src={logoArmChair}
                        alt="Antiquário"
                        width={50}
                        priority
                    />
                </Link>
                <ButtonGroup>
                    <TextInput
                        placeholder="Digite sua busca"
                        value={searchQuery}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        suffix={
                            <MagnifyingGlass
                                color="#000"
                                size={25}
                                onClick={handleIconClick}
                            />
                        }
                    />
                </ButtonGroup>
            </NavContainer>
        </Container>
    );
};
