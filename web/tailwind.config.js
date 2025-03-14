/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['bumblebee']
  }
};

export default config;
