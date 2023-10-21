/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "drop-down": "url('../images/down-arrow.svg')",
        overlay: "url('../images/overlay.png')",
      },
    },
  },
  plugins: [],
};
