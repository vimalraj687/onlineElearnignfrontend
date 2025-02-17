/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // primary: "#f7ba34",
        // secondary: "#69a79c",
        light: "#f7f7f7",
        dark: "#333333",
        dark2: "#999999",
        primary: "#D32F2F",  // Deep green (motivating & fresh)
        secondary: "#FF6659", // Warm orange (engaging & creative)
        accent: "#E76F51",  // Coral red (call-to-action elements)
        background: "#F7F7F7", // Light grey (clean & minimal)
        text: "#333333", // Dark grey (better readability)
        textLight: "#999999", // Lighter grey for subtitles
        success: "#2A9D8F", // Teal green (for progress & success)
        warning: "#E9C46A",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
