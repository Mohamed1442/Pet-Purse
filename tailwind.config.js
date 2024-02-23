/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: "#EBA059",
        "primaryShade": "#f9e3cd",
        secondary: "#F5F5F5",
        grey: "#41245C",
        white: "#fff",
        success: "#82DD55",
        error: "#E23636",
        pending: "#b7b7b7"

      }
    },
  },
  plugins: [],
}

