/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        text: "#f5f5f5",
        secondary: "#2892D7",
        // headingColor: "#1D70A2",
      },
    },
  },
  plugins: [],
};
