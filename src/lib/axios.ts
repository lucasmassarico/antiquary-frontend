import axios from "axios";
import Cookies from "js-cookie"; // Atualize para o import de ES Modules
import { env } from "../env";

export const api = axios.create({ baseURL: env.NEXT_PUBLIC_BACKEND_URL });

export const staticFilesServer = env.NEXT_PUBLIC_STATIC_FILES_BACKEND_URL;

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        // Adiciona o token apenas se a requisição exigir autenticação
        // caso precisar adicione headers: { requiresAuth: true }
        if (config.headers?.requiresAuth && token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
