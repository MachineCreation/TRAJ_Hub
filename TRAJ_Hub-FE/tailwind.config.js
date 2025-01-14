/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'grey': 'rgba(27,27,27)'
      },
      height: {
        'custom-main': 'calc(100svh - 10rem)', 
      },
      boxShadow: {
        'orange-inner': '0 0 .5rem .5rem rgba(114 38 0 / .5) inset',
        'orange-inner-large': '0 0 5rem 5rem rgba(114 38 0 / .2) inset',
        'dark-upper-inner': '0 .5rem .5rem .5rem rgba(255 255 255 / .5) inset',
        'outer-green': '0 0 .5rem .5rem rgba(17, 254, 0, 0.6)',
        'outer-lower-light': '0 .5rem .75rem rgba(255,255,255,.3)'
      },
      dropShadow: {
        'arcade': ' 0 .3rem 1rem rgba(225, 0, 225, 1)',
        'arrows': ' 0 0 .5rem rgba(88, 221, 0, 1)'
      },
      keyframes: {
        pulseShadow: {
          '0%, 100%': { filter: 'drop-shadow(0 .5rem .5rem rgba(225, 0, 225, 1))' },
          '50%': { filter: 'drop-shadow(0 1rem 1rem rgba(225, 225, 0, 1))' },
        },
        border: {
          '0%, 100%': { borderColor: 'rgb(5, 252, 25)' },
          '50%': { borderColor: 'blue' },
        },
      },
      animation: {
        "pulse-shadow": 'pulseShadow 3s ease-in-out infinite',
        border: 'border 4s infinite',
      },
      borderWidth: {
        '0.2': '.2rem'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.drop-filter': {
          filter: 'drop-shadow(0 0 .5rem rgb(85, 85, 255))',
        },
      });
    }
  ],
}

