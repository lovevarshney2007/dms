/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        primary: {
          DEFAULT: '#FF9F3F',
          start: '#FF9B3D',
          end: '#FFC15A',
        },
        accent: {
          green: '#00FFB4',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
