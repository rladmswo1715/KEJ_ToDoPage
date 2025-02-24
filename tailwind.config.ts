import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "var-primary-200": "#fed7aa",
        "var-primary-300": "#fdba74",
        "var-primary-400": "#fb923c",
        "var-primary-500": "#f97316",
      },
    },
  },
  plugins: [],
} satisfies Config;
