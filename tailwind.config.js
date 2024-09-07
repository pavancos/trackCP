/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBeige: '#ecece2', // Background color
        softRed: 'rgba(255, 105, 105, 1)',
        vividBlue: '#615EFC',
        coral: '#FF885B',
        deepTeal: 'rgba(13, 124, 102, 1)'
      },
      fontFamily: {
        advent: ['"Advent Pro"', 'sans-serif'],
        afacad: ['Afacad', 'sans-serif'],
        alexandria: ['Alexandria', 'sans-serif'],
      },
      borderRadius: {
        '28px': '28px',
      },
    },
  },
  plugins: [],
}

