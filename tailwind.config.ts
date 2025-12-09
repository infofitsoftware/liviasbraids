/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPink: "#f472b6",
        brandGold: "#fbbf24",
        brandDark: "#0b0810",   // slightly richer black
        brandPlum: "#2b0f1a",   // deep plum for shadows
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
