import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { api } from "@/lib/axios";
import { SoldProduct } from "@/types";

const MonthlySalesChart: React.FC = () => {
    const [data, setData] = useState<{ month: string; totalSales: number }[]>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<SoldProduct[]>(
                    "/sold_products/find/all/"
                );
                const salesData = response.data;

                const salesByMonth = new Map<string, number>();
                salesData.forEach((sale) => {
                    const saleDate = new Date(sale.sale_date);
                    const month = saleDate.toLocaleString("default", {
                        month: "long",
                    });
                    const year = saleDate.getFullYear();
                    const key = `${month}/${year}`;
                    const saleValue = sale.sale_price * sale.quantity_sold;
                    salesByMonth.set(
                        key,
                        (salesByMonth.get(key) || 0) + saleValue
                    );
                });

                // Array para ordenar os meses corretamente
                const monthOrder = [
                    "janeiro",
                    "fevereiro",
                    "março",
                    "abril",
                    "maio",
                    "junho",
                    "julho",
                    "agosto",
                    "setembro",
                    "outubro",
                    "novembro",
                    "dezembro",
                ];

                const chartData = Array.from(salesByMonth.entries())
                    .map(([month, totalSales]) => ({ month, totalSales }))
                    .sort((a, b) => {
                        const [monthA, yearA] = a.month.split("/");
                        const [monthB, yearB] = b.month.split("/");

                        if (yearA !== yearB) {
                            return parseInt(yearA) - parseInt(yearB);
                        }

                        return (
                            monthOrder.indexOf(monthA.toLowerCase()) -
                            monthOrder.indexOf(monthB.toLowerCase())
                        );
                    });

                setData(chartData);
            } catch (error) {
                console.error("Erro ao buscar dados para o gráfico:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card sx={{ height: 400 }}>
            <CardContent sx={{ height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                    Vendas Mensais
                </Typography>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 65,
                            }} // Adiciona margem extra na parte inferior
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                interval="preserveStartEnd"
                                angle={-45}
                                textAnchor="end"
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) =>
                                    `R$ ${value.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}`
                                }
                            />
                            <Legend verticalAlign="top" height={36} />{" "}
                            {/* Move a legenda para o topo, se necessário */}
                            <Line
                                type="monotone"
                                dataKey="totalSales"
                                name="Total de Vendas"
                                stroke="#8884d8"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default MonthlySalesChart;
