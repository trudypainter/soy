module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      phone: { max: "740px" }, // for screens smaller than SM (less than 640px)
    },
    extend: {
      fontFamily: {
        aeonik: ["Aeonik", "sans-serif"],
        brut: ["BrutGrotesque", "sans-serif"],
      },
      fontSize: {
        base: "16px", // default text size
        xl: "20px", // text-xl
        xs: "12px", // text-xs
      },
      spacing: {
        18: "4.5rem", // 1rem = 4px, so 4.5rem = 18px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
