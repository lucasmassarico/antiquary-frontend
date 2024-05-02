import {
    FooterContainer,
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

export const Footer = () => {
    return (
        <FooterContainer>
            <FooterColumn>
                <ColumnTitle>Categorias</ColumnTitle>
                <ColumnItemLink href="/teste">Teste e teste</ColumnItemLink>
            </FooterColumn>
            <FooterColumn>
                <ColumnTitle>Sobre Nós</ColumnTitle>
                <ColumnItemLink href="/sobrenos">Sobre Nós</ColumnItemLink>
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
        </FooterContainer>
    );
};
