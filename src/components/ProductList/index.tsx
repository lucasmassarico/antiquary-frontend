import React, { useState, useRef, useEffect } from "react";
import { Product, Category } from "@/types";
import { toTitleCase } from "@/helpers";
import { Container } from "../Container";
import { staticFilesServer, api } from "@/lib/axios";
import { ProductsContainer } from "../ProductsContainer";
import { ProductCard } from "../ProductCard";
import {
    IconButton,
    CircularProgress,
    Fade,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ProductListProps {
    products: Product[];
    showFilters?: boolean; // Nova prop opcional
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    showFilters = true,
}) => {
    const [visibleCount, setVisibleCount] = useState<number>(0);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [columns, setColumns] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const [categories, setCategories] = useState<Category[]>([]);

    const multipleOfProducts = 5;

    const [sortOption, setSortOption] = useState<string>("default");
    const [filterOption, setFilterOption] = useState<string>("all");

    const categoryIds = React.useMemo(() => {
        return Array.from(
            new Set(products.map((product) => product.id_category))
        );
    }, [products]);

    const categoryMap = React.useMemo(() => {
        const map = new Map<number, Category>();
        categories.forEach((category) => {
            map.set(category.id, category);
        });
        return map;
    }, [categories]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const promises = categoryIds.map((id) =>
                    api.get(`/categories/find/by_id/${id}`)
                );
                const responses = await Promise.all(promises);
                const categoriesData = responses.map(
                    (response) => response.data
                );
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        if (categoryIds.length > 0) {
            fetchCategories();
        }
    }, [categoryIds]);

    // Calculate columns
    const calculateColumns = () => {
        if (containerRef.current) {
            const computedStyle = window.getComputedStyle(containerRef.current);
            const gridTemplateColumns = computedStyle.getPropertyValue(
                "grid-template-columns"
            );
            const columns = gridTemplateColumns.split(" ").length;
            setColumns(columns);
            // Set the initial visible count based on the columns
            setVisibleCount(columns * multipleOfProducts);
        }
    };

    useEffect(() => {
        // Calculate columns on load and on window resize
        calculateColumns();
        window.addEventListener("resize", calculateColumns);
        return () => window.removeEventListener("resize", calculateColumns);
    }, []);

    // Apply sorting and filtering
    const sortedProducts = React.useMemo(() => {
        let productsCopy = [...products];

        if (showFilters) {
            // Apply Availability Filter
            if (filterOption === "available") {
                productsCopy = productsCopy.filter(
                    (product) => product.stock_quantity > 0 && product.activated
                );
            } else if (filterOption === "unavailable") {
                productsCopy = productsCopy.filter(
                    (product) =>
                        product.stock_quantity === 0 || !product.activated
                );
            }

            // Apply Sorting
            if (sortOption === "price-asc") {
                productsCopy.sort((a, b) => {
                    const priceA = a.price || 0;
                    const priceB = b.price || 0;
                    return priceA - priceB;
                });
            } else if (sortOption === "price-desc") {
                productsCopy.sort((a, b) => {
                    const priceA = a.price || 0;
                    const priceB = b.price || 0;
                    return priceB - priceA;
                });
            } else {
                // Default Sorting: Available products first
                productsCopy.sort((a, b) => {
                    const aAvailable = a.stock_quantity > 0 && a.activated;
                    const bAvailable = b.stock_quantity > 0 && b.activated;

                    if (aAvailable === bAvailable) {
                        return 0;
                    } else if (aAvailable) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
            }
        } else {
            // If filters are hidden, you can choose to apply a default sorting or none
            productsCopy.sort((a, b) => {
                const aAvailable = a.stock_quantity > 0 && a.activated;
                const bAvailable = b.stock_quantity > 0 && b.activated;

                if (aAvailable === bAvailable) {
                    return 0;
                } else if (aAvailable) {
                    return -1;
                } else {
                    return 1;
                }
            });
        }

        return productsCopy;
    }, [products, sortOption, filterOption, showFilters]);

    // Load more products
    const loadMoreProducts = () => {
        setVisibleCount(
            (prevCount) => prevCount + columns * multipleOfProducts
        );
    };

    const productsToDisplay = sortedProducts.slice(0, visibleCount);
    const hasMoreProducts = visibleCount < sortedProducts.length;

    return (
        <>
            {showFilters && (
                /* Filter and Sort Controls */
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: 2,
                        maxWidth: "1280px",
                        margin: "0 auto",
                    }}
                >
                    <FormControl
                        variant="outlined"
                        size="small"
                        sx={{
                            minWidth: 150,
                            mr: 2,
                        }}
                    >
                        <InputLabel id="sort-label">Ordenar por</InputLabel>
                        <Select
                            labelId="sort-label"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            label="Ordenar por"
                        >
                            <MenuItem value="default">Padrão</MenuItem>
                            <MenuItem value="price-asc">
                                Preço: Menor para Maior
                            </MenuItem>
                            <MenuItem value="price-desc">
                                Preço: Maior para Menor
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 150, mr: 2 }}
                    >
                        <InputLabel id="filter-label">
                            Disponibilidade
                        </InputLabel>
                        <Select
                            labelId="filter-label"
                            value={filterOption}
                            onChange={(e) => setFilterOption(e.target.value)}
                            label="Disponibilidade"
                        >
                            <MenuItem value="all">Todos</MenuItem>
                            <MenuItem value="available">Disponíveis</MenuItem>
                            <MenuItem value="unavailable">
                                Indisponíveis
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}
            {/* Products List */}
            <Container>
                <ProductsContainer ref={containerRef}>
                    {productsToDisplay.map((product, index) => {
                        const category = categoryMap.get(product.id_category);
                        return (
                            <Fade
                                in={true}
                                timeout={500}
                                key={product.id}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <div>
                                    <ProductCard
                                        id={product.id}
                                        activated={product.activated}
                                        stock_quantity={product.stock_quantity}
                                        title={toTitleCase(product.name)}
                                        imageSrc={`${staticFilesServer}${
                                            product.image_thumbnail_name.startsWith(
                                                "/"
                                            )
                                                ? ""
                                                : "/"
                                        }${product.image_thumbnail_name}`}
                                        imageAlt={product.name}
                                        price={product.price}
                                        category={category}
                                    />
                                </div>
                            </Fade>
                        );
                    })}
                    {/* Load More Button */}
                    {hasMoreProducts && (
                        <div
                            style={{
                                gridColumn: "1 / -1",
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "1rem",
                            }}
                        >
                            <IconButton
                                onClick={loadMoreProducts}
                                disabled={isLoadingMore}
                                aria-label="Carregar mais produtos"
                            >
                                {isLoadingMore ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    <ExpandMoreIcon fontSize="large" />
                                )}
                            </IconButton>
                        </div>
                    )}
                </ProductsContainer>
            </Container>
        </>
    );
};

export default ProductList;
