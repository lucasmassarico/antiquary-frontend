import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { Box, Grid, Button, TextField, Paper } from "@mui/material";
import Cookies from "js-cookie"; // Certifique-se de importar corretamente o Cookies

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // Verifica se o usuário já está logado
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            router.push("/admin/dashboard"); // Redireciona se o token existir
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("auth/login", { email, password });

            const { access_token } = response.data;

            // Armazena o token nos cookies por 5 dias
            Cookies.set("token", access_token, { expires: 5 });

            // emite o evento de login bem-sucedido
            window.dispatchEvent(new Event("login"));

            router.push("/admin/dashboard"); // Redireciona após login bem-sucedido
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert("Email ou senha incorretos.");
            } else {
                alert(
                    "Um erro ocorreu. Por favor, tente novamente mais tarde."
                );
            }
            console.error(error);
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            style={{ minHeight: "60vh" }} // Centraliza verticalmente na tela
        >
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} style={{ padding: "2rem" }}>
                    <form onSubmit={handleSubmit}>
                        <Box mb={3}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{
                                    backgroundColor: "white",
                                }}
                            />
                        </Box>
                        <Box mb={3}>
                            <TextField
                                label="Senha"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{
                                    backgroundColor: "white",
                                }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
