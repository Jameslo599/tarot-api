/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "drop-down": "url('../images/down-arrow.svg')",
        overlay: "url('../images/overlay.png')",
        gradient:
          "linear-gradient(to left bottom, #7851a9, #815cad, #8a67b2, #9373b6, #9b7eba, #9086c4, #838ecb, #7696d0, #3f9dd0, #00a2c3, #00a5aa, #00a489);",
      },
      backgroundColor: {
        moss: "#00C9AA",
        pink: "#FCEAFF",
        lilac: "#A68DC0",
        violet: "#7851A9",
        gradient:
          "linear-gradient(to left bottom, #7851a9, #815cad, #8a67b2, #9373b6, #9b7eba, #9086c4, #838ecb, #7696d0, #3f9dd0, #00a2c3, #00a5aa, #00a489);",
      },
      colors: {
        moss: "#00C9AA",
        pink: "#FCEAFF",
        lilac: "#A68DC0",
        violet: "#7851A9",
      },
      fontFamily: {
        alegreya: ['"Alegreya"', "serif"],
      },
    },
  },
  plugins: [],
};
