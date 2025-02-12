import React from "react";
import { Card, CardContent, Typography, Tooltip } from "@mui/material";

interface StatisticCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    newProducts?: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
    title,
    value,
    icon,
    newProducts,
}) => {
    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                {icon}
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                >
                    {title}
                </Typography>
                <Typography variant="h5">
                    {value}
                    {newProducts ? (
                        <Tooltip
                            title={`Foram adicionados ${newProducts} novo(s) produto(s) neste mês.`}
                            arrow
                        >
                            <span> ({newProducts} novos)</span>
                        </Tooltip>
                    ) : (
                        ""
                    )}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatisticCard;
