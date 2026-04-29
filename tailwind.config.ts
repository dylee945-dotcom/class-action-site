import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F2A4A",
          50: "#E8EEF5",
          100: "#C5D4E6",
          200: "#9BB5D3",
          300: "#6B91BB",
          400: "#3D70A3",
          500: "#0F2A4A",
          600: "#0C2240",
          700: "#091A33",
          800: "#061225",
          900: "#030A16",
        },
        accent: {
          DEFAULT: "#E45858",
          50: "#FDEAEA",
          100: "#FAC9C9",
          200: "#F59494",
          300: "#EF6E6E",
          400: "#E45858",
          500: "#D43A3A",
          600: "#B22E2E",
          700: "#8F2323",
          800: "#6B1818",
          900: "#480D0D",
        },
        bg: "#F7F8FA",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      animation: {
        "count-up": "countUp 1s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        countUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
