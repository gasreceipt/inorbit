import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        coral: {
          DEFAULT: "#FF6B6B",
          light: "#FF8787",
          dark: "#E85555",
        },
        purple: {
          DEFAULT: "#A78BFA",
          light: "#C4B5FD",
          dark: "#8B5CF6",
        },
        cyan: {
          DEFAULT: "#67E8F9",
          light: "#A5F3FC",
          dark: "#22D3EE",
        },
        pink: {
          DEFAULT: "#F472B6",
          light: "#F9A8D4",
          dark: "#EC4899",
        },
        yellow: {
          DEFAULT: "#FCD34D",
          light: "#FDE68A",
          dark: "#F59E0B",
        },
        gray: {
          950: "#0a0a0a",
          900: "#121212",
          800: "#1e1e1e",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#6b7280",
          400: "#9ca3af",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.2) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.2) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.2) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.2) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.2) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.2) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.2) 0px, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(255, 107, 107, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 107, 107, 0.8)" },
        },
      },
      boxShadow: {
        "glow": "0 0 20px rgba(255, 107, 107, 0.4)",
        "glow-lg": "0 0 40px rgba(255, 107, 107, 0.6)",
        "purple-glow": "0 0 20px rgba(167, 139, 250, 0.4)",
        "cyan-glow": "0 0 20px rgba(103, 232, 249, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
