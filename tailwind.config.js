/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./components/atoms/**/*.{js,jsx,ts,tsx}",
    "./components/molecules/**/*.{js,jsx,ts,tsx}",
    "./components/templates/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e76f51",
          light: "#f4a261",
        },
        secondary: {
          DEFAULT: "#e9c4a6",
        },
        tertiary: {
          DEFAULT: "#2a9d8f",
        },
        cyan: {
          DEFAULT: "#264653",
        },
      },
      fontFamily: {
        "poppins-thin": ["Poppins_100Thin", "sans-serif"],
        "poppins-thin-italic": ["Poppins_100Thin_Italic", "sans-serif"],
        "poppins-extralight": ["Poppins_200ExtraLight", "sans-serif"],
        "poppins-extralight-italic": [
          "Poppins_200ExtraLight_Italic",
          "sans-serif",
        ],
        "poppins-light": ["Poppins_300Light", "sans-serif"],
        "poppins-light-italic": ["Poppins_300Light_Italic", "sans-serif"],
        "poppins-regular": ["Poppins_400Regular", "sans-serif"],
        "poppins-regular-italic": ["Poppins_400Regular_Italic", "sans-serif"],
        "poppins-medium": ["Poppins_500Medium", "sans-serif"],
        "poppins-medium-italic": ["Poppins_500Medium_Italic", "sans-serif"],
        "poppins-semibold": ["Poppins_600SemiBold", "sans-serif"],
        "poppins-semibold-italic": ["Poppins_600SemiBold_Italic", "sans-serif"],
        "poppins-bold": ["Poppins_700Bold", "sans-serif"],
        "poppins-bold-italic": ["Poppins_700Bold_Italic", "sans-serif"],
        "poppins-extrabold": ["Poppins_800ExtraBold", "sans-serif"],
        "poppins-extrabold-italic": [
          "Poppins_800ExtraBold_Italic",
          "sans-serif",
        ],
        "poppins-black": ["Poppins_900Black", "sans-serif"],
        "poppins-black-italic": ["Poppins_900Black_Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
