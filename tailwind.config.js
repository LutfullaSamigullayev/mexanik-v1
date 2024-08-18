/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "hover": "rgba(0, 0, 0, 0.06)"
      }
    },
  },
  plugins: [],
}

