/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#3f67e0",
        brandLight: "#7892e0",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
