const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(breadcrumbs|button|ripple|spinner).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: "var(--barlow)",
        open_sans: "var(--open-sans)",
      },
      fontSize: {
        xxl: "22px",
      },
      colors: {
        orange: {
          50: "#f13a00",
          100: "#ff3c00",
          200: "#ff4f1a",
        },
        black: {
          50: "#111",
          100: "#5e5f6e",
          200: "#1A1A1A",
        },
        white: {
          50: "#f0f0f0",
          100: "#fff",
        },
        brown: {
          50: "#F4ECDF",
          100: "#F7F0E5",
        },
      },
      backgroundImage: {
        "breadcrumb-bg": "url('/breadcrumbs-bg.jpg')",
        "parallax-bg": "url('/images/parallax-bg.jpg')",
        "delivery-bg": "url('/images/delivery-bg-overlay.png')",
      },
    },
  },
  plugins: [nextui()],
};
