/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      keyframes: {
        floating: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(5%)",
          },
          "100%": {
            transform: "translateY(0)",
          }
        },
      },
    },
    plugins: [],
  },
};
