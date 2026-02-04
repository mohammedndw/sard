/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black': '#0A0A0A',
        'background': '#ffffff',
        'white': '#FFFFFF',
        'primary-text': '#1A1A1A',
        'accent-dark': '#C4B6A6',
        'accent-light': '#E3D7C6',
      },
      fontFamily: {
        'primary': ['Cairo', 'sans-serif'],
        'secondary': ['Tajawal', 'sans-serif'],
      },
      borderRadius: {
        'custom': '10px',
      },
    },
  },
  plugins: [],
}
