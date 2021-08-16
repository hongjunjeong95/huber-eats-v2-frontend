const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
      height: {
        "80vh": "80vh",
        "84vh": "84vh",
        "88vh": "88vh",
        "88vh": "88vh",
        "92vh": "92vh",
        "96vh": "96vh",
      },
      gridAutoRows: {
        "440px": "minmax(0, 440px)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
