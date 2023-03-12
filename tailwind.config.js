/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueBg: "var(--color-bluespace-background)",
        blueCardBg: "var(--color-bluespace-card-background)",
      }
    },
  },
  fontFamily: {
    sans: ["var(--font-inter)"],
  },
  darkMode: 'class',
  plugins: [],
}
