/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "index.html"],
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
