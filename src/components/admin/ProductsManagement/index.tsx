import React, { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Product, Category } from "@/types";
import { Button, Box, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import EditProductModal from "./EditProductModal";
import CreateProductModal from "./CreateProductModal";
import SellProductModal from "./SellProductModal";

const ProductsManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [sellProduct, setSellProduct] = useState<Product | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(30);
    const [page, setPage] = useState<number>(0);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const categoryMap = categories.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
    }, {} as Record<number, string>);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products/find/all");
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = React.useMemo(() => {
        if (!searchQuery) {
            return products;
        }
        const lowercasedQuery = searchQuery.toLowerCase();
        return products.filter((product) =>
            product.name.toLowerCase().includes(lowercasedQuery)
        );
    }, [products, searchQuery]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nome", width: 200 },
        { field: "id_category", headerName: "ID Categoria", width: 130 },
        {
            field: "category_name",
            headerName: "Nome Categoria",
            width: 250,
            valueGetter: (value, row) => {
                return categoryMap[row.id_category] || "N/A";
            },
        },
        { field: "price", headerName: "Preço", width: 100 },
        { field: "stock_quantity", headerName: "Estoque", width: 100 },
        {
            field: "activated",
            headerName: "Ativado?",
            width: 100,
            valueGetter: (value, row) => {
                return row.activated ? "Sim" : "Não";
            },
        },
        {
            field: "actions",
            headerName: "Ações",
            width: 280,
            sortable: false,
            renderCell: (params) => {
                const product = params.row as Product;
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => setEditProduct(product)}
                            style={{ marginRight: 8 }}
                        >
                            Alterar
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleDeleteProduct(product.id)}
                            style={{ marginRight: 8 }}
                        >
                            Deletar
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() => handleSellProduct(product)}
                            disabled={product.stock_quantity === 0}
                        >
                            Venda
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories/find/all");
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                console.log(productId);
                await api.delete(`/products/delete/${productId}`);
                setProducts(
                    products.filter((product) => product.id !== productId)
                );
            } catch (error) {
                console.log("Failed to delete product:", error);
                alert("Failed to delete product. Please try again.");
            }
        }
    };

    const handleSellProduct = (product: Product) => {
        setSellProduct(product);
    };

    return (
        <Box sx={{ width: "80%", margin: "0 auto" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCreateModalOpen(true)}
                >
                    Novo Produto
                </Button>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Pesquisar produtos"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>
            <DataGrid
                rows={filteredProducts}
                columns={columns}
                pagination
                paginationMode="client"
                loading={loading}
                disableRowSelectionOnClick
                autoHeight
            />
            {editProduct && (
                <EditProductModal
                    product={editProduct}
                    categories={categories}
                    onClose={() => setEditProduct(null)}
                    onSave={fetchProducts}
                />
            )}
            {createModalOpen && (
                <CreateProductModal
                    categories={categories}
                    onClose={() => setCreateModalOpen(false)}
                    onSave={fetchProducts}
                />
            )}
            {sellProduct && (
                <SellProductModal
                    product={sellProduct}
                    onClose={() => setSellProduct(null)}
                    onSave={() => {
                        fetchProducts(); // Refresh the product list
                        setSellProduct(null);
                    }}
                />
            )}
        </Box>
    );
};

export default ProductsManagement;
