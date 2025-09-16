import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true, // runs tsc in a worker
            eslint: {
                lintCommand: "eslint \"./src/**/*.{ts,tsx}\"", // shows ESLint errors
            },
        }),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
