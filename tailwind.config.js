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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
