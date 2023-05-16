/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      phone: "639px",
      desktop: "1280px",
    },
    colors: {
      red: colors.red,
      yellow: colors.amber,
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [],
};
