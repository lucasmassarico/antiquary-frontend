import React, { useState } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { api } from "@/lib/axios";
import { Product } from "@/types";
import { SelectChangeEvent } from "@mui/material/Select";

interface CreateSoldProductModalProps {
    onClose: () => void;
    onSave: () => void;
    products: Product[];
}

const CreateSoldProductModal: React.FC<CreateSoldProductModalProps> = ({
    onClose,
    onSave,
    products,
}) => {
    const [formData, setFormData] = useState({
        product_id: "",
        quantity_sold: 1,
        sale_price: 0,
        sale_date: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dataToSend = {
            product_id: Number(formData.product_id),
            quantity_sold: Number(formData.quantity_sold),
            sale_price: Number(formData.sale_price),
            sale_date: formData.sale_date || undefined,
        };

        try {
            await api.post("/sold_products/sell", dataToSend);
            onSave();
            onClose();
        } catch (error) {
            console.error("Failed to create sold product:", error);
            alert("Falha ao registrar a venda. Por favor, tente novamente.");
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <h2>Registrar Nova Venda</h2>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="product-label">Produto</InputLabel>
                        <Select
                            labelId="product-label"
                            label="Produto"
                            name="product_id"
                            value={formData.product_id}
                            onChange={handleSelectChange}
                        >
                            {products.map((product) => (
                                <MenuItem
                                    key={product.id}
                                    value={product.id.toString()}
                                >
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Quantidade Vendida"
                        name="quantity_sold"
                        type="number"
                        value={formData.quantity_sold}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Preço de Venda"
                        name="sale_price"
                        type="number"
                        value={formData.sale_price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Data da Venda"
                        name="sale_date"
                        type="datetime-local"
                        value={formData.sale_date}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginRight: 8 }}
                        >
                            Registrar Venda
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

export default CreateSoldProductModal;
