/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skyline-200': '#6d748e',
        'skyline-300': '#545d78',
        'skyline-400': '#2c334f',
      },
    },
  },
  plugins: [],
}

