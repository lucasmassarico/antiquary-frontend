import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { Product } from "@/types";
import { api } from "@/lib/axios";

interface SellProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: () => void;
}

const SellProductModal: React.FC<SellProductModalProps> = ({
    product,
    onClose,
    onSave,
}) => {
    const [quantitySold, setQuantitySold] = useState<number>(1);
    const [salePrice, setSalePrice] = useState<number>(
        Number(product.price.toString().replace(",", "."))
    ); // Certifique-se de usar "." para o valor
    const [totalValue, setTotalValue] = useState<number>(
        Number(product.price.toString().replace(",", "."))
    );
    const [error, setError] = useState<string>("");

    useEffect(() => {
        calculateTotalValue();
    }, [quantitySold, salePrice]);

    const calculateTotalValue = () => {
        setTotalValue(quantitySold * salePrice);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value > product.stock_quantity) {
            setError(
                `Quantidade vendida não pode ser maior que o estoque (${product.stock_quantity}).`
            );
        } else if (value < 1) {
            setError("Quantidade vendida deve ser pelo menos 1.");
        } else {
            setError("");
            setQuantitySold(value);
        }
    };

    const handleSalePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(",", "."); // Trocar "," por "."
        const numberValue = Number(value);

        if (isNaN(numberValue) || numberValue < 0) {
            setError("Preço de venda deve ser um número positivo.");
        } else {
            setError("");
            setSalePrice(numberValue);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (error) {
            alert("Por favor, corrija os erros antes de continuar.");
            return;
        }

        try {
            await api.post("/sold_products/sell", {
                product_id: product.id,
                quantity_sold: quantitySold,
                sale_price: salePrice,
            });
            onSave();
        } catch (error) {
            console.error("Failed to register sale:", error);
            alert("Falha ao registrar a venda. Por favor, tente novamente.");
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" gutterBottom>
                    Marcar venda: {product.name}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Quantidade Vendida"
                        type="number"
                        value={quantitySold}
                        onChange={handleQuantityChange}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            inputProps: { min: 1, max: product.stock_quantity },
                        }}
                        required
                    />
                    <TextField
                        label="Preço de Venda (por unidade)"
                        type="number"
                        value={salePrice}
                        onChange={handleSalePriceChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ inputProps: { min: 0, step: "0.01" } }} // Definir step como "0.01" para valores decimais
                        required
                    />
                    <Typography variant="subtitle1" gutterBottom>
                        Valor Total da Venda: R$ {totalValue.toFixed(2)}
                    </Typography>
                    {error && (
                        <Typography color="error" variant="body2" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginRight: 8 }}
                            disabled={!!error}
                        >
                            Confirmar Venda
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
    maxWidth: "500px",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
};

export default SellProductModal;
