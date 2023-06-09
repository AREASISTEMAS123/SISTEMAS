/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
                'cv-primary': '#16232B',
                'cv-secondary': '#283C4C',
            },
    },
  },
  plugins: [],
}