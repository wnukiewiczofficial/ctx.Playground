/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chakra: ["Chakra Petch", "sans-serif"],
      },
      colors: {
        main: "#132029",
        accent: "#FFA810",
        accentTwo: "#78AFB7",
        additional: "#9E5C49",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
