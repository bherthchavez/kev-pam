/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      glacial: ['glacial indifference', ...defaultTheme.fontFamily.sans]
      // freestyle: ['freestyle script', ...defaultTheme.fontFamily.sans]
    },
  },
  plugins: [],
}


