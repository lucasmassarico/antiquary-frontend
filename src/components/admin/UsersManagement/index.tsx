import React, { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { User } from "@/types";
import { Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import EditUserModal from "./EditUserModal";
import CreateUserModal from "./CreateUserModal";

const UsersManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users/find/all", {
                headers: { requiresAuth: true },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nome", width: 200 },
        { field: "email", headerName: "Email", width: 250 },
        {
            field: "active",
            headerName: "Ativo",
            width: 100,
            valueGetter: (value, row) => (row.active ? "Sim" : "Não"),
        },
        {
            field: "access_role",
            headerName: "Nível de Acesso",
            width: 150,
            valueGetter: (value, row) => {
                const role = row.access_role;
                if (role === 1) return "Super Usuário";
                if (role === 99) return "Administrador";
                return "Desconhecido";
            },
        },
        {
            field: "actions",
            headerName: "Ações",
            width: 250,
            sortable: false,
            renderCell: (params) => {
                const user = params.row as User;
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => setEditUser(user)}
                            style={{ marginRight: 8 }}
                            disabled
                        >
                            Alterar
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            Deletar
                        </Button>
                    </>
                );
            },
        },
    ];

    const handleDeleteUser = async (userId: number) => {
        if (confirm("Você tem certeza que deseja deletar este usuário?")) {
            try {
                await api.delete(`/users/delete/${userId}`, {
                    headers: { requiresAuth: true },
                });
                setUsers(users.filter((user) => user.id !== userId));
            } catch (error) {
                console.error("Failed to delete user:", error);
                alert("Falha ao deletar usuário. Por favor, tente novamente.");
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
                Novo Usuário
            </Button>
            <DataGrid
                rows={users}
                columns={columns}
                pagination
                paginationMode="client"
                loading={loading}
                disableRowSelectionOnClick
                autoHeight
            />
            {editUser && (
                <EditUserModal
                    user={editUser}
                    onClose={() => setEditUser(null)}
                    onSave={fetchUsers}
                />
            )}
            {createModalOpen && (
                <CreateUserModal
                    onClose={() => setCreateModalOpen(false)}
                    onSave={fetchUsers}
                />
            )}
        </Box>
    );
};

export default UsersManagement;
