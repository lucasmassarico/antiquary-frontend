import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category, Product } from "@/types";
import { api } from "@/lib/axios";
import RichEditor from "@/components/RichEditor"; // Importando o RichEditor
import { Descendant } from "slate";
import { CustomElement } from "@/types";

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: () => void;
    categories: Category[];
}

const EditProductModal: React.FC<EditProductModalProps> = ({
    product,
    onClose,
    onSave,
    categories,
}) => {
    const [formData, setFormData] = useState({
        name: product.name,
        id_category: product.id_category,
        price: product.price,
        stock_quantity: product.stock_quantity,
        activated: product.activated,
        image_thumbnail_name: null as File | null, // Armazenar nova imagem, se alterada
    });

    // Inicializando o estado do Slate editor com a descrição do produto
    const [editorValue, setEditorValue] = useState<Descendant[]>(() => {
        try {
            return JSON.parse(product.description) as CustomElement[]; // Tentando carregar a descrição existente
        } catch {
            return [
                {
                    type: "paragraph",
                    children: [{ text: "" }],
                } as CustomElement,
            ]; // Valor padrão se falhar
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<number>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                image_thumbnail_name: e.target.files![0],
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const description = JSON.stringify(editorValue);

        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("id_category", String(formData.id_category));
        productData.append("description", description);
        productData.append("price", String(formData.price));
        productData.append("stock_quantity", String(formData.stock_quantity));
        productData.append("activated", String(formData.activated));

        console.log([...productData]);

        if (formData.image_thumbnail_name) {
            productData.append(
                "image_thumbnail_name",
                formData.image_thumbnail_name
            );
        }

        try {
            await api.put(`/products/update/${product.id}`, productData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            onSave();
            onClose();
        } catch (error) {
            console.log("Failed to update product:", error);
            alert("Failed to update product. Please try again.");
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <h2>Alterar Produto</h2>
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
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="category-label">Categoria</InputLabel>
                        <Select
                            labelId="category-label"
                            label="Category"
                            name="id_category"
                            value={formData.id_category}
                            onChange={handleSelectChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* RichEditor para editar a descrição */}
                    <RichEditor
                        initialValue={editorValue}
                        setEditorValue={setEditorValue}
                    />

                    <TextField
                        label="Preço"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Quantidade em estoque"
                        name="stock_quantity"
                        type="number"
                        value={formData.stock_quantity}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    {/* Campo "Activated" e campo de upload de imagem */}
                    <Box display="flex" alignItems="center" mt={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.activated}
                                    onChange={handleInputChange}
                                    name="activated"
                                />
                            }
                            label="Produto Ativado?"
                        />
                    </Box>

                    {/* Campo de upload de arquivo com borda */}
                    <Box
                        mt={2}
                        p={2}
                        border="1px solid #ccc"
                        borderRadius="4px"
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <InputLabel shrink>
                            Atualizar Capa do Produto
                        </InputLabel>
                        <input
                            type="file"
                            name="image_thumbnail_name"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ marginTop: "8px" }}
                        />
                    </Box>

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
    maxWidth: "800px",
    maxHeight: "90dvh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
};

export default EditProductModal;
