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
        move: {
          "0%": {
            backgroundPosition: "0 0",
          },
          "100%": {
            backgroundPosition: "50px 50px",
          }
        },
        expandWidth: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          }
        }
      },
    },
    plugins: [],
  },
};
