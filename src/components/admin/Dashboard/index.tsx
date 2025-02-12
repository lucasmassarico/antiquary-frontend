import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import StatisticCard from "./StatisticCard";
import ProductsByCategoryChart from "./ProductsByCategoryChart";
import MonthlySalesChart from "./MonthlySalesChart";
import { api } from "@/lib/axios";
import { Product, SoldProduct } from "@/types";
import { ShoppingCart, AttachMoney } from "@mui/icons-material";

const Dashboard: React.FC = () => {
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [newProductsCount, setNewProductsCount] = useState<number>(0);
    const [totalSalesValue, setTotalSalesValue] = useState<number>(0);

    console.log(newProductsCount);

    useEffect(() => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // Buscar produtos à venda e novos produtos adicionados no mês
        api.get<Product[]>("/products/find/all").then((response) => {
            const availableProducts = response.data.filter(
                (product) => product.activated && product.stock_quantity > 0
            );

            const newProducts = response.data.filter((product) => {
                const [day, month, yearAndTime] =
                    product.publication_date.split("-");
                const [year, time] = yearAndTime.split(" ");
                const [hour, minute, second] = time.split(":");

                // Cria um objeto Date com os valores extraídos
                const productDate = new Date(
                    Number(year),
                    Number(month) - 1, // Mês é 0-indexado em JavaScript
                    Number(day),
                    Number(hour),
                    Number(minute),
                    Number(second)
                );

                return (
                    productDate.getMonth() === currentMonth &&
                    productDate.getFullYear() === currentYear
                );
            });

            setTotalProducts(availableProducts.length);
            setNewProductsCount(newProducts.length);
        });

        // Buscar total de vendas do mês
        api.get<SoldProduct[]>("/sold_products/find/all").then((response) => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const salesThisMonth = response.data.filter((sale) => {
                const saleDate = new Date(sale.sale_date);
                return (
                    saleDate.getMonth() === currentMonth &&
                    saleDate.getFullYear() === currentYear
                );
            });

            const totalValue = salesThisMonth.reduce((acc, sale) => {
                return acc + sale.sale_price * sale.quantity_sold;
            }, 0);

            setTotalSalesValue(totalValue);
        });
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard Administrativo
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <StatisticCard
                        title="Produtos à Venda"
                        value={totalProducts}
                        newProducts={newProductsCount}
                        icon={<ShoppingCart fontSize="large" color="primary" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <StatisticCard
                        title="Total de Vendas do Mês"
                        value={`R$ ${totalSalesValue.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`}
                        icon={<AttachMoney fontSize="large" color="success" />}
                    />
                </Grid>

                {/* Outros cards */}
            </Grid>
            <Grid container spacing={2} mt={5}>
                <Grid item xs={12} sm={6} md={12}>
                    <MonthlySalesChart />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProductsByCategoryChart />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
