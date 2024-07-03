// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
        
//       },
//     },
//   },
//   plugins: [],
// };


const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // Update to 'media' or remove entirely
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", ...fontFamily.sans],
      },
      colors: {
        primary: {
          400: "#00E0F3",
          500: "#00c4fd",
        },
        dark: "#222222",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
