import React, { useState, useEffect, useCallback } from "react";
import { getImageUrl } from "@/helpers";
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
    Grid,
    IconButton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category, Product } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "@/lib/axios";
import RichEditor from "@/components/RichEditor"; // Importando o RichEditor
import { Descendant } from "slate";
import { CustomElement } from "@/types";
import Image from "next/image";

interface ProductImage {
    id: number;
    image_path: string;
}

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
    const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);

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

    // Memoiza a função fetchProductImages para que ela não seja recriada em cada renderização
    const fetchProductImages = useCallback(async () => {
        try {
            const response = await api.get(
                `/products_images/find/by_product_id/${product.id}`
            );
            setExistingImages(response.data);
        } catch (error) {
            console.error("Failed to fetch product images:", error);
        }
    }, [product.id]); // product.id é a dependência da função

    useEffect(() => {
        fetchProductImages();
    }, [fetchProductImages]);

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

    const handleDeleteImage = (imageId: number) => {
        setImagesToDelete((prev) => [...prev, imageId]);
        setExistingImages((prev) =>
            prev.filter((image) => image.id !== imageId)
        );
    };

    const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; // Pega a lista de arquivos
        if (files && files.length > 0) {
            // Garante que files não é null e tem arquivos
            setNewImages((prev) => [...prev, ...Array.from(files)]);
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
            await api.put(`/products/update/${product.id}`, productData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Delete images marked for deletion
            for (const imageId of imagesToDelete) {
                try {
                    await api.delete(`/products_images/delete/${imageId}`);
                } catch (error) {
                    console.error(`Failed to delete image ${imageId}:`, error);
                }
            }

            // Upload new images
            for (const image of newImages) {
                const imageData = new FormData();
                imageData.append("file", image);
                try {
                    await api.post(
                        `/products_images/upload/by_product_id?id_product=${product.id}`,
                        imageData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                } catch (error) {
                    console.error("Failed to upload image:", error);
                }
            }

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

                    <Box mt={2}>
                        <InputLabel shrink>Imagens do Produto</InputLabel>
                        <Grid container spacing={1}>
                            {existingImages.map((image) => (
                                <Grid item xs={3} key={image.id}>
                                    <Box position="relative">
                                        <Image
                                            src={getImageUrl(image.image_path)}
                                            alt={`Imagem ${image.id}`}
                                            style={{ width: "100%" }}
                                            layout="responsive"
                                            width={100}
                                            height={100}
                                        />
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteImage(image.id)
                                            }
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box
                        mt={2}
                        p={2}
                        border="1px solid #ccc"
                        borderRadius="4px"
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <InputLabel shrink>Adicionar Novas Imagens</InputLabel>
                        <input
                            type="file"
                            name="new_product_images"
                            multiple
                            onChange={handleNewImagesChange}
                            accept="image/*"
                            style={{ marginTop: "8px" }}
                        />
                        {newImages.length > 0 && (
                            <Box mt={2} display="flex" flexWrap="wrap">
                                {newImages.map((image, index) => (
                                    <Box key={index} mr={1} mb={1}>
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={`Nova Imagem ${index + 1}`}
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
