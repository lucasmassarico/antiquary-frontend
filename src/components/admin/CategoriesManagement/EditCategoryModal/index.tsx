import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Category } from "@/types";
import { api } from "@/lib/axios";

interface EditCategoryModalProps {
    category: Category;
    onClose: () => void;
    onSave: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    category,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        name: category.name,
        discount: category.discount,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "discount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.put(`/categories/update/${category.id}`, formData); // Sem o url_name
            onSave();
            onClose();
        } catch (error) {
            console.error("Failed to update category:", error);
            alert("Falha ao atualizar categoria. Por favor, tente novamente.");
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <h2>Alterar Categoria</h2>
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
                        label="Desconto"
                        name="discount"
                        type="number"
                        value={formData.discount}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginRight: 8 }}
                        >
                            Salvar
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

export default EditCategoryModal;