import React from "react";

import {
    FooterContainer,
    FooterContent,
    FooterColumn,
    ColumnTitle,
    ColumnItem,
    ColumnItemLink,
    ColumnItemWithIcon,
} from "./style";

import {
    InstagramLogo,
    FacebookLogo,
    WhatsappLogo,
    Phone,
} from "phosphor-react";

interface FooterCategory {
    name: string;
    url_name?: string;
}

interface FooterProps {
    categories: FooterCategory[];
}

export const Footer: React.FC<FooterProps> = ({ categories }) => {
    const isOverflow = categories.length > 15;

    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <FooterContainer>
            <FooterContent>
                <FooterColumn>
                    <ColumnTitle>Categorias</ColumnTitle>
                    {/* Mostra até 16 categorias */}
                    {categories
                        .slice(0, 15)
                        .map((category: FooterCategory, index: number) => (
                            <ColumnItemLink
                                key={index}
                                href={`/${
                                    category.url_name || category.name
                                }`.toLowerCase()}
                            >
                                <p>{toTitleCase(category.name)}</p>
                            </ColumnItemLink>
                        ))}
                    {/* Mostra a linha "Todas Categorias" se houver overflow */}
                    {isOverflow && (
                        <ColumnItemLink href="/categorias">
                            <p>Todas Categorias</p>
                        </ColumnItemLink>
                    )}
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>Redes Sociais</ColumnTitle>
                    <ColumnItemWithIcon
                        href="https://www.instagram.com"
                        target="_blank"
                    >
                        <InstagramLogo size={32} />
                        /antiquario
                    </ColumnItemWithIcon>
                    <ColumnItemWithIcon
                        href="https://www.facebook.com"
                        target="_blank"
                    >
                        <FacebookLogo size={32} />
                        /antiquario
                    </ColumnItemWithIcon>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>Atendimento</ColumnTitle>
                    <ColumnItem>
                        <p>Horário de atendimento:</p>
                        <p>08:00 às 18:00 -</p>
                        <p>Segunda a Sexta,</p>
                        <p>horário de Brasília</p>
                    </ColumnItem>
                    <br />
                    <ColumnItem>
                        <b>
                            <p>Endereço:</p>
                        </b>
                        <p>Rua Ficitia, 1322 -</p>
                        <p>Jardim Ficticio</p>
                        <p>São Manuel/SP - CEP: 18650-000</p>
                    </ColumnItem>
                    <br />
                    <ColumnItem>
                        <b>
                            <span>
                                <Phone />
                                Telefone
                            </span>
                            <span>
                                {" / "}
                                <WhatsappLogo />
                                Whatsapp:
                            </span>
                        </b>
                        <p>+55 (14) 99197-4654</p>
                    </ColumnItem>
                    <br />
                    <ColumnItem>
                        <b>E-mail:</b>
                        <p>faleconosco@antiquario.com.br</p>
                    </ColumnItem>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>Sobre Nós</ColumnTitle>
                    <ColumnItemLink href="/sobrenos">Sobre Nós</ColumnItemLink>
                </FooterColumn>
            </FooterContent>
        </FooterContainer>
    );
};
