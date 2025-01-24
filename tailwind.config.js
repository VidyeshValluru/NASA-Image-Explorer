/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0B0B1E',
          light: '#1A1A2E',
          accent: '#4A4E69',
        }
      }
    },
  },
  plugins: [],
}

