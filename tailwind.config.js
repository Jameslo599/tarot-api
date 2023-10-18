/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "drop-down": "url('/public/images/down-arrow.svg')",
      },
      padding: {
        "10%": "10%",
      },
    },
  },
  plugins: [],
};
