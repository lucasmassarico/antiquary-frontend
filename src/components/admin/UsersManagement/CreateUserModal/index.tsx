import React, { useState } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { api } from "@/lib/axios";

interface CreateUserModalProps {
    onClose: () => void;
    onSave: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        active: true,
        access_role: 1, // Padrão para Super Usuário
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as any).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/users/create", formData, {
                headers: { requiresAuth: true }, // Adiciona o cabeçalho para autenticação
            });
            onSave();
            onClose();
        } catch (error) {
            console.log("Failed to create user:", error);
            alert("Falha ao criar usuário. Por favor, tente novamente.");
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <h2>Criar Novo Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Senha"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        select
                        label="Nível de Acesso"
                        name="access_role"
                        value={formData.access_role}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value={1}>Super Usuário</MenuItem>
                        <MenuItem value={99}>Administrador</MenuItem>
                    </TextField>

                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginRight: 8 }}
                        >
                            Criar
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
};

export default CreateUserModal;
