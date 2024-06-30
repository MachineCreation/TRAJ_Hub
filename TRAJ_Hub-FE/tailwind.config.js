/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'orange-inner': '0 0 .5rem .5rem rgba(114 38 0 / .5) inset'
      },
      keyframes: {
        border: {
          '0%, 100%': { borderColor: 'rgb(5, 252, 25)' },
          '50%': { borderColor: 'blue' },
        },
      },
      animation: {
        border: 'border 4s infinite',
      },
    },
  },
  plugins: [],
}

