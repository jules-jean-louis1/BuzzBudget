/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-custom": "linear-gradient(20deg, #FF2E00, #FD9D58)",
      },
    },
  },
  plugins: [],
};
