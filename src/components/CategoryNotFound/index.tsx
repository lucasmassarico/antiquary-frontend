import React from "react";
import { CategoryNotFoundDiv } from "./styles";

export const CategoryNotFound = () => {
    return (
        <>
            <CategoryNotFoundDiv>
                <h3>
                    Desculpe, não encontramos nenhum produto que corresponda ao
                    seu critério de pesquisa.
                </h3>
                <p>Por favor, tente novamente com um termo diferente...</p>
            </CategoryNotFoundDiv>
        </>
    );
};
