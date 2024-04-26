// libs
import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo } from "phosphor-react";

// components
import { Button } from "../Button";
import { TextInput } from "../TextInput";

// styles
import { Container, NavContainer, ButtonGroup } from "./styles";

// images & icons
import logoArmChair from "@/assets/armchair.svg";
import { MagnifyingGlass } from "phosphor-react";

export const NavBar = () => {
    return (
        <Container>
            <NavContainer>
                <Image src={logoArmChair} alt="Antiquário" width={50} />
                <ButtonGroup>
                    <TextInput
                        placeholder="Digite sua busca"
                        suffix={<MagnifyingGlass color="#000" size={25} />}
                    />

                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Button>
                            Contatos <WhatsappLogo size={72} />
                        </Button>
                    </Link>
                </ButtonGroup>
            </NavContainer>
        </Container>
    );
};
