import { defineConfig } from "eslint/config";
import checkFile from "eslint-plugin-check-file";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

    plugins: {
        "check-file": checkFile,
    },

    rules: {
        "prefer-arrow-callback": ["error"],
        "prefer-template": ["error"],
        semi: ["error"],
        quotes: ["error"],

        "check-file/filename-naming-convention": ["error", {
            "**/*.{ts,tsx}": "KEBAB_CASE",
        }, {
            ignoreMiddleExtensions: true,
        }],

        "check-file/folder-naming-convention": ["error", {
            "src/**/!(__tests__)": "KEBAB_CASE",
        }],
    },
}]);