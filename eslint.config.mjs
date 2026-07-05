import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  // Apply the ruleset to source files so the ESLint flat-config CLI engages
  // (`next lint` is deprecated and crashes on flat config).
  { files: ["**/*.{js,jsx,ts,tsx}"] },
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  {
    rules: {
      // Cosmetic only (literal quotes/apostrophes in JSX text).
      "react/no-unescaped-entities": "off",
      // Static export -> next/image needs a custom loader; this rule is low-signal here.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
