// libs
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "phosphor-react";

// components
import { Button } from "../Button";

// styles
import { HeaderContainer, ButtonGroup } from "./styles";

// images
import logoArmChair from "@/assets/armchair.svg";

export const Header = () => {
    return (
        <HeaderContainer>
            <Image src={logoArmChair} alt="Antiquário" width={100} />
            <ButtonGroup>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <Button>
                        Produtos <ShoppingCart />
                    </Button>
                </Link>
            </ButtonGroup>
        </HeaderContainer>
    );
};
