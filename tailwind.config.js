/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ozempic-teal": "#006373",
        "ozempic-gray": "#7C7C7C",
        "ozempic-dark": "#333333",
        "ozempic-light": "#E5E5E5",
        "ozempic-cream": "#FFFEF8",
        "gradient-orange": "#EC9C1A",
        "gradient-red": "#DD2C34",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "ozempic-subtitle": ["23.98px", { lineHeight: "1em" }],
        "ozempic-cta": ["28px", { lineHeight: "1em", letterSpacing: "-3.71%" }],
        "ozempic-disclaimer": [
          "18px",
          { lineHeight: "1.2em", letterSpacing: "-4%" },
        ],
        "ozempic-qr": ["12.05px", { lineHeight: "1.2em" }],
      },
      boxShadow: {
        "cta-inner":
          "inset -1px 1px 7px 0px rgba(255, 255, 255, 0.69), inset 0px 2px 2px 0px rgba(253, 239, 202, 0.6), inset 0px -2px 2px 0px rgba(44, 21, 10, 0.2)",
        "map-inner": "inset 0px 0px 109px 0px rgba(243, 248, 255, 0.54)",
      },
      backgroundImage: {
        "cta-gradient":
          "linear-gradient(180deg, rgba(236, 172, 26, 1) 0%, rgba(221, 44, 52, 1) 100%)",
      },
      textColor: {
        "gradient-orange": "#EC9C1A",
        "gradient-red": "#DD2C34",
      },
    },
  },
  plugins: [],
};
