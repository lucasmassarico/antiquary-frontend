// libs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { api } from "@/lib/axios"; // Certifique-se de que o caminho do seu cliente Axios está correto
import { TextInput } from "../TextInput";

// styles
import { Container, NavContainer, ButtonGroup } from "./styles";

// images & icons
import logoArmChair from "@/assets/armchair.svg";
import { MagnifyingGlass } from "phosphor-react";

// types
import { Category } from "@/types"; // Certifique-se de que o tipo Category está correto

// Função para converter o nome para "Title Case"
const toTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const NavBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Função para buscar as categorias
    useEffect(() => {
        api.get<Category[]>("categories/find/all")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch categories:", error);
            });
    }, []);

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

    // Abre o menu ao clicar no botão de categorias
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsMenuOpen(true);
    };

    // Fecha o menu de categorias
    const handleMenuClose = () => {
        setAnchorEl(null);
        setIsMenuOpen(false);
    };

    return (
        <Container>
            <NavContainer>
                <ButtonGroup>
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

                    {/* Botão para abrir o dropdown de categorias */}
                    <Button
                        aria-controls="category-menu"
                        aria-haspopup="true"
                        variant="text"
                        onClick={handleMenuOpen}
                        size="small"
                        style={{
                            marginLeft: "2rem",
                            fontWeight: "bold",
                            padding: "0 8px", // Diminui o padding para reduzir a altura e largura
                            fontSize: "0.875rem", // Define um tamanho de fonte menor
                            color: "#0B3F30",
                            borderColor: "#0B3F30",
                        }}
                        endIcon={
                            isMenuOpen ? (
                                <KeyboardArrowUp />
                            ) : (
                                <KeyboardArrowDown />
                            )
                        }
                    >
                        Categorias
                    </Button>
                </ButtonGroup>

                {/* Dropdown de Categorias */}
                <Menu
                    id="category-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {categories.map((category, index) => (
                        <MenuItem
                            key={index}
                            onClick={() =>
                                router.push(
                                    `/${(
                                        category.url_name || category.name
                                    ).toLowerCase()}`
                                )
                            }
                        >
                            {toTitleCase(category.name)}
                        </MenuItem>
                    ))}
                </Menu>

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
