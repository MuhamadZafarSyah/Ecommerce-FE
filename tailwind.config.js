/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F53D2D",
        gradientPrimary: "#FF6533",
        secondary: "#1E1E1E",
        accent: "#e11d48",
        whitemode: "#F2F2F2",
      },
      animation: {
        fade: "fadeOut 0.2s ease-in-out",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: 0 },
          "10%": { opacity: 0.2 },
          "20%": { opacity: 0.3 },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
      },
      boxShadow: {
        innerColor: "0 0 0px 1000px #1E1E1E inset",
      },
    },
  },
  plugins: [],
};
