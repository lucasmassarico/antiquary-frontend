import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { api } from "@/lib/axios";
import { Product, Category } from "@/types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const ProductsByCategoryChart: React.FC = () => {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] =
                    await Promise.all([
                        api.get<Product[]>("/products/find/all/"),
                        api.get<Category[]>("/categories/find/all/"),
                    ]);

                const categoryMap = new Map<number, string>();
                categoriesResponse.data.forEach((category) => {
                    categoryMap.set(category.id, category.name);
                });

                const categoryCounts = new Map<string, number>();
                productsResponse.data.forEach((product) => {
                    const categoryName =
                        categoryMap.get(product.id_category) || "Desconhecida";
                    categoryCounts.set(
                        categoryName,
                        (categoryCounts.get(categoryName) || 0) + 1
                    );
                });

                const chartData = Array.from(categoryCounts.entries()).map(
                    ([name, value]) => ({ name, value })
                );

                setData(chartData);
            } catch (error) {
                console.error("Erro ao buscar dados para o gráfico:", error);
                setError("Erro ao carregar dados do gráfico.");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Card sx={{ height: 400 }}>
            <CardContent sx={{ height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                    Produtos por Categoria
                </Typography>
                {data.length > 0 ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />{" "}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <Typography>Carregando dados...</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductsByCategoryChart;
