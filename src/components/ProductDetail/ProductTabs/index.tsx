import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import SlateContentRenderer from "@/components/SlateContentRenderer";
import { Product } from "@/types";
import { Descendant } from "slate";

interface ProductTabsProps {
    product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
    const [tabIndex, setTabIndex] = useState(0);

    // Parse the product description
    let descriptionContent: Descendant[] = [];
    try {
        descriptionContent = JSON.parse(product.description);
    } catch (error) {
        console.log("Failed to parse product description:", error);
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box mt={4}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="Descrição" />
                <Tab label="Especificações" />
                {/* Add more tabs if needed */}
            </Tabs>

            {/* Tab Panels */}
            {tabIndex === 0 && (
                <Box p={2}>
                    <SlateContentRenderer content={descriptionContent} />
                </Box>
            )}
            {tabIndex === 1 && (
                <Box p={2}>
                    {/* Specifications content */}
                    <Typography>Especificações do produto.</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ProductTabs;
