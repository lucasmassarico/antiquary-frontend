import React, { useState } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { api } from "@/lib/axios";
import { Category } from "@/types";
import RichEditor from "@/components/RichEditor"; // Importando o componente RichEditor
import { Descendant } from "slate";
import { CustomElement } from "@/types";
import Image from "next/image";

interface CreateProductModalProps {
    onClose: () => void;
    onSave: () => void;
    categories: Category[];
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
    onClose,
    onSave,
    categories,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        id_category: null,
        price: 0,
        stock_quantity: 0,
        activated: true,
        image_thumbnail_name: null as File | null,
    });
    const [additionalImages, setAdditionalImages] = useState<File[]>([]);

    // Estado para o Slate editor
    const [editorValue, setEditorValue] = useState<Descendant[]>([
        {
            type: "paragraph",
            children: [{ text: "" }],
        } as CustomElement, // Fazendo cast para CustomElement, que é um subtipo de Descendant
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAdditionalImagesChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setAdditionalImages((prev) => [...prev, ...Array.from(files)]);
        }
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

        if (formData.image_thumbnail_name) {
            productData.append(
                "image_thumbnail_name",
                formData.image_thumbnail_name
            );
        }

        try {
            const response = await api.post("/products/create", productData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const createdProduct = response.data;

            // Upload additional images
            if (additionalImages.length > 0) {
                for (const image of additionalImages) {
                    const imageData = new FormData();
                    imageData.append("file", image);

                    await api.post(
                        `/products_images/upload/by_product_id?id_product=${createdProduct.id}`,
                        imageData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                }
            }

            onSave();
            onClose();
        } catch (error) {
            console.error("Failed to create product:", error);
            alert("Failed to create product. Please try again.");
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <h2>Criar novo produto</h2>
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
                            value={
                                formData.id_category ? formData.id_category : ""
                            }
                            onChange={handleSelectChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Usando o RichEditor para a descrição */}
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

                    {/* Campo "Activated" em uma linha e campo de upload de imagem na linha debaixo */}
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
                        <InputLabel shrink>Capa do Produto</InputLabel>
                        <input
                            type="file"
                            name="image_thumbnail_name"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                            style={{ marginTop: "8px" }}
                        />
                    </Box>

                    {/* Upload de imagens adicionais */}
                    <Box
                        mt={2}
                        p={2}
                        border="1px solid #ccc"
                        borderRadius="4px"
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <InputLabel shrink>Imagens do Produto</InputLabel>
                        <input
                            type="file"
                            name="product_images"
                            multiple
                            onChange={handleAdditionalImagesChange}
                            accept="image/*"
                            style={{ marginTop: "8px" }}
                        />
                        {/* Optionally display selected images */}
                        {additionalImages.length > 0 && (
                            <Box mt={2} display="flex" flexWrap="wrap">
                                {additionalImages.map((image, index) => (
                                    <Box key={index} mr={1} mb={1}>
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={`Imagem ${index + 1}`}
                                            style={{
                                                objectFit: "cover",
                                            }}
                                            width={100}
                                            height={100}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

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
    maxWidth: "800px",
    maxHeight: "90dvh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
};

export default CreateProductModal;
