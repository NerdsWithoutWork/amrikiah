/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'Primary': '#1F1D1D',
        'Secondary': '#FE8C00',
        'Tertiary': '#F0F0F0',
        'Agrey':{
          100: '#2e2e2e',
          200: '#878787',
          300: '#464646',
        }
      }
    },
  },
  plugins: [],
}

