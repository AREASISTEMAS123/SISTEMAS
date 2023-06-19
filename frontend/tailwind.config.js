/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minWidth: {
      '1/2': '50%',
    },
    extend: {
      maxWidth: {
        '1/2': '50%',
      },
      colors: {
                'cv-primary': '#16232B',
                'cv-secondary': '#283C4C',
            },
    },
  },
  plugins: [],
}