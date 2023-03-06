/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: "rgb(var(--black))",
      navy: "rgb(var(--navy))",
      yellow: "rgb(var(--yellow))"
    }
  },
  fontFamily: {
    sans: ["var(--font-inter)"],
  },
  plugins: [],
}
