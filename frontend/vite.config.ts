import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import * as path from "path";

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
    build: {
        outDir: "build",
        sourcemap: false,
        minify: "esbuild",
        rollupOptions: {
            input: "./index.html",
            output: {
                manualChunks: undefined,
            },
        },
    },
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@redux": path.resolve(__dirname, "./src/redux"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@objects": path.resolve(__dirname, "./src/objects"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@img": path.resolve(__dirname, "./src/img"),
        },
    },
});
