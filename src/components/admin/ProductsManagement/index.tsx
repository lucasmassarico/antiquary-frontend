import React, { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Product, Category } from "@/types";
import { Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import EditProductModal from "./EditProductModal";
import CreateProductModal from "./CreateProductModal";

const ProductsManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(30);
    const [page, setPage] = useState<number>(0);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);

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
            width: 250,
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
                            color="secondary"
                            size="small"
                            onClick={() => handleDeleteProduct(product.id)}
                        >
                            Deletar
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

    return (
        <Box sx={{ width: "80%", margin: "0 auto" }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setCreateModalOpen(true)}
                style={{ marginBottom: 16 }}
            >
                Novo Produto
            </Button>
            <DataGrid
                rows={products}
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
        </Box>
    );
};

export default ProductsManagement;
