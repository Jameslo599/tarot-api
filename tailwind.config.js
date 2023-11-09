/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "drop-down": "url('../images/down-arrow.svg')",
        overlay: "url('../images/overlay.png')",
      },
      backgroundColor: {
        soot: "#58788C",
        silver: "#99B4BF",
        navy: "#253C59",
        bronze: "#BF8D30",
        gold: "#D9B70D",
      },
      colors: {
        soot: "#58788C",
        silver: "#99B4BF",
        navy: "#253C59",
        bronze: "#BF8D30",
        gold: "#D9B70D",
      },
    },
  },
  plugins: [],
};
