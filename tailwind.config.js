/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './app/**/*.{css,html}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {}
  },
  plugins: []
};
