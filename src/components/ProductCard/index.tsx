import React, { ReactNode } from "react";
import {
    ProductContainer,
    ProductImage,
    ProductTitle,
    ProductBody,
    ProductPrice,
    ButtonContainer,
} from "./style";

import { Button } from "../Button";
import { DotsThreeOutline } from "phosphor-react";

interface ProductCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    price?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    title,
    imageSrc,
    imageAlt,
    price,
}) => {
    return (
        <ProductContainer>
            <ProductImage>
                <img className="productImage" src={imageSrc} alt={imageAlt} />
            </ProductImage>
            <ProductBody>
                <ProductTitle>
                    <h3>
                        <span>{title}</span>
                    </h3>
                </ProductTitle>
                <ProductPrice>
                    <h2>
                        <span>{price ? `R$ ${price}` : ""}</span>
                    </h2>
                </ProductPrice>
                <ButtonContainer>
                    <Button>
                        <DotsThreeOutline />
                    </Button>
                </ButtonContainer>
            </ProductBody>
        </ProductContainer>
    );
};
