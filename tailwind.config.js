module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        arabic: ["Noto Naskh Arabic"],
        surahnames: ["surahnames"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
