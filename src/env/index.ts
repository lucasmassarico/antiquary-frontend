import { z } from "zod";

// Definir o esquema de validação para as variáveis de ambiente
const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    NEXT_PUBLIC_BACKEND_URL: z
        .string()
        .url()
        .default("http://localhost:5000/api/"),
    NEXT_PUBLIC_STATIC_FILES_BACKEND_URL: z
        .string()
        .url()
        .default("http://localhost:5000/static/"),
    NEXT_PUBLIC_MAP_LOCATION_URL: z.string().url(),
    NEXT_PUBLIC_WHATSAPP_NUMBER: z.string(),
});

// Fazer o parsing e validação das variáveis de ambiente
const _env = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_STATIC_FILES_BACKEND_URL:
        process.env.NEXT_PUBLIC_STATIC_FILES_BACKEND_URL,
    NEXT_PUBLIC_MAP_LOCATION_URL: process.env.NEXT_PUBLIC_MAP_LOCATION_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
});

if (!_env.success) {
    console.error("❌ Invalid environment variables", _env.error.format());
    throw new Error("Invalid environment variables");
}

// Exporta as variáveis de ambiente validadas
export const env = _env.data;
