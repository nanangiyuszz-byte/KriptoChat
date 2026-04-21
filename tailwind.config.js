export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0a0c",
        neonPurple: "#a855f7",
        glassWhite: "rgba(255, 255, 255, 0.05)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};
