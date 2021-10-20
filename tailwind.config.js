module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: { base: "#fff", light: "#f7f6f2", normal: "#e8f6ef" },
        gray: {
          light: "#f3f1f5",
          normal: "#c9ccd5",
          dark: "#c8c6c6",
          extraDark: "#7f7c82",
          primary: "#171717",
          base: "#2b2b2b",
        },
        black: {
          normal: "#263238",
          base: "#000000",
        },
        green: {
          base: "#66bb6a",
          light: "#a7f3d0",
          normal: "#6ee7b7",
          dark: "#10b981",
          primary: "#2ab939",
          primaryDark: "#5d7d34",
        },
        btn: {
          dark: "#876a1d",
        },
      },
      maxWidth: {
        144: "144rem",
        120: "120rem",
        50: "50rem",
        105: "105rem",
        12: "12rem",
        16: "16rem",
      },
      maxHeight: {
        55: "55rem",
      },
      height: {
        100: "100rem",
        144: "144rem",
        120: "120rem",
        50: "50rem",
        105: "105rem",
        30: "30rem",
        33: "33rem",
        35: "35rem",
      },
      boxShadow: {
        greenBase: "1px 10px 30px -10px rgba(102,187,106,1)",
        greenLight: "5px 10px 15px  rgba(209, 250, 229, 1)",
        grayBase: "1px 3px 5px 0px rgba(0,0,0,0.01)",
        grayLight: "3px 5px 10px 0px rgba(0,0,0,0.03)",
        grayNormal: "3px 5px 10px  rgba(0,0,0,0.1)",
        grayMedium: "6px 10px 20px  rgba(0,0,0,0.2)",
        grayDark: "10px 15px 20px 0px rgba(0,0,0,0.3)",
      },
      zIndex: {
        1: "-1",
      },
      gridTemplateColumns: {
        normal: "repeat(auto-fill, minmax(40rem, 1fr))",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus"],
      border: ["hover"],
    },
  },
  plugins: [],
};
