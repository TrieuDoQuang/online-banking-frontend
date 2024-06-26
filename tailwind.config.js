/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./component/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(to right, #00014F, #3A6073)",
      },
      colors: {
        "blue-1": "#00014F",
        "blue-2": "#3A6073",
        "blue-3": "#151D3B",
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        white: {
          DEFAULT: "ffffff",
        },
        gray: {
          100: "#CDCDE0",
        },
        information: {
          DEFAULT: "#405AB5",
        },
        blue: {
          DEFAULT: "#ADD8E6",
          100: "#ADD8E6",
          200: "#8AC7DB",
          300: "#67B7D1",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
