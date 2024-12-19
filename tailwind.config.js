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
        applebg:'#d9d6cc',
        softRed: 'rgba(255, 105, 105, 1)',
        vividBlue: '#615EFC',
        coral: '#FF885B',
        deepTeal: 'rgba(13, 124, 102, 1)',
      },
      fontFamily: {
        advent: ['"Advent Pro"', 'sans-serif'],
        afacad: ['"Afacad"', 'sans-serif'],
        alexandria: ['"Alexandria"', 'sans-serif'],
      },
      borderRadius: {
        '28px': '28px',
        '20px': '20px',
      },
      dropShadow:{
        'left': '0px 2px 3px rgba(255,  255, 255, 0.25)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Plugin to hide scrollbars
  ],
};
