import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f7f9fb",
        "surface-dim": "#d8dadc",
        "surface-bright": "#f7f9fb",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "on-surface": "#191c1e",
        "on-surface-variant": "#45464d",
        outline: "#76777d",
        "outline-variant": "#c6c6cd",
        "surface-tint": "#565e74",
        primary: "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#131b2e",
        secondary: "#00687a",
        "on-secondary": "#ffffff",
        "secondary-container": "#57dffe",
        tertiary: "#000000",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#00201c",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        background: "#f7f9fb",
        "on-background": "#191c1e",
        "surface-variant": "#e0e3e5",
        teal: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
      },
      borderRadius: {
        xl: "2rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "4.5": "1.125rem",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "soft-lg": "0 16px 32px -10px rgb(15 23 42 / 0.14), 0 8px 16px -8px rgb(15 23 42 / 0.08)",
        card: "0 20px 40px rgba(15, 23, 42, 0.08)",
        glass: "0 20px 40px rgba(15, 23, 42, 0.08)",
      },
      fontSize: {
        "display": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        "heading": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "subheading": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "body": ["0.9375rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        "label": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "500" }],
        "caption": ["0.8125rem", { lineHeight: "1.125rem", fontWeight: "500" }],
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
