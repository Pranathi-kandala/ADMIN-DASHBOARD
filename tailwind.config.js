/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'navy-blue': '#001f3f',
        'beige': '#f5f5dc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
