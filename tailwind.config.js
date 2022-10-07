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
      animation: {
        fade: "fadeIn .1s ease-out",
      },
  
      // that is actual animation
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacoty: 1 },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
