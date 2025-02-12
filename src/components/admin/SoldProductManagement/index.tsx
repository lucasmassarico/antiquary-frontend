import React, { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { SoldProduct, Product } from "@/types";
import { Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import CreateSoldProductModal from "./CreateSoldProductModal";

const SoldProductsManagement: React.FC = () => {
    const [soldProducts, setSoldProducts] = useState<SoldProduct[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(30);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchSoldProducts();
        fetchProducts();
    }, []);

    const fetchSoldProducts = async () => {
        try {
            const response = await api.get("/sold_products/find/all/");
            setSoldProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch sold products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products/find/all");
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    // Create a map of product IDs to product names for display
    const productMap = products.reduce((map, product) => {
        map[product.id] = product.name;
        return map;
    }, {} as Record<number, string>);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "product_id", headerName: "ID Produto", width: 100 },
        {
            field: "product_name",
            headerName: "Nome Produto",
            width: 200,
            valueGetter: (value, row) => {
                return productMap[row.product_id] || "N/A";
            },
        },
        {
            field: "quantity_sold",
            headerName: "Quantidade Vendida",
            width: 150,
        },
        { field: "sale_price", headerName: "Preço de Venda", width: 130 },
        {
            field: "sale_date",
            headerName: "Data da Venda",
            width: 180,
            valueGetter: (value, row) => {
                const date = new Date(row.sale_date);
                return date.toLocaleString();
            },
        },
        {
            field: "actions",
            headerName: "Ações",
            width: 150,
            sortable: false,
            renderCell: (params) => {
                const soldProduct = params.row as SoldProduct;
                return (
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleDeleteSoldProduct(soldProduct.id)}
                    >
                        Deletar
                    </Button>
                );
            },
        },
    ];

    const handleDeleteSoldProduct = async (soldProductId: number) => {
        if (confirm("Você tem certeza que deseja deletar esta venda?")) {
            try {
                await api.delete(`/sold_products/delete/${soldProductId}/`);
                setSoldProducts(
                    soldProducts.filter((sp) => sp.id !== soldProductId)
                );
            } catch (error) {
                console.error("Failed to delete sold product:", error);
                alert("Falha ao deletar a venda. Por favor, tente novamente.");
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
                Nova Venda
            </Button>
            <DataGrid
                rows={soldProducts}
                columns={columns}
                pagination
                paginationMode="client"
                loading={loading}
                disableRowSelectionOnClick
                autoHeight
            />
            {createModalOpen && (
                <CreateSoldProductModal
                    onClose={() => setCreateModalOpen(false)}
                    onSave={fetchSoldProducts}
                    products={products}
                />
            )}
        </Box>
    );
};

export default SoldProductsManagement;
