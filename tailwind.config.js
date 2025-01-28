/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'blue-950',
        'secondary': '#E2A581',
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841'
      },
      fontFamily: {
        'primary': ["Montserrat", "sans-serif"],
        'secondary': ["Nunito Sans", "sans-serif"]
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(255, 255, 255, 1)' },
        },
      },
    },
  },
  plugins: [],
}

