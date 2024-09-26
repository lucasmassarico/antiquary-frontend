// src/components/admin/CategoriesManagement.tsx

import React, { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Category } from "@/types";
import { Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import EditCategoryModal from "./EditCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";

const CategoriesManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(30);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories/find/all");
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nome", width: 200 },
        { field: "url_name", headerName: "URL Name", width: 200 },
        { field: "discount", headerName: "Desconto", width: 130 },
        {
            field: "actions",
            headerName: "Ações",
            width: 250,
            sortable: false,
            renderCell: (params) => {
                const category = params.row as Category;
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => setEditCategory(category)}
                            style={{ marginRight: 8 }}
                        >
                            Alterar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => handleDeleteCategory(category.id)}
                        >
                            Deletar
                        </Button>
                    </>
                );
            },
        },
    ];

    const handleDeleteCategory = async (categoryId: number) => {
        if (confirm("Você tem certeza que deseja deletar esta categoria?")) {
            try {
                await api.delete(`/categories/delete/${categoryId}`);
                setCategories(
                    categories.filter((category) => category.id !== categoryId)
                );
            } catch (error) {
                console.error("Failed to delete category:", error);
                alert(
                    "Falha ao deletar categoria. Por favor, tente novamente."
                );
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
                Nova Categoria
            </Button>
            <DataGrid
                rows={categories}
                columns={columns}
                pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                paginationMode="client"
                loading={loading}
                disableRowSelectionOnClick
                autoHeight
            />
            {editCategory && (
                <EditCategoryModal
                    category={editCategory}
                    onClose={() => setEditCategory(null)}
                    onSave={fetchCategories}
                />
            )}
            {createModalOpen && (
                <CreateCategoryModal
                    onClose={() => setCreateModalOpen(false)}
                    onSave={fetchCategories}
                />
            )}
        </Box>
    );
};

export default CategoriesManagement;
