/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/ngo/NGOAdminConsole.jsx"
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        coral: "#FF6B6B",
        "coral-dark": "#FF5252",
        teal: "#4ECDC4",
        gold: "#FFD93D",
        charcoal: "#2C3E50",
        cream: "#F7F9F9",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.3s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }
    }
  },
  plugins: [],
}
