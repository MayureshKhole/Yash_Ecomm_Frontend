/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        18: "4.2rem", // 4.5rem is equivalent to 72px (1rem = 16px)
      },
      fontFamily: {
        merienda: ['Merienda', 'cursive'],
      },
     
    },
  },
  plugins: [],
};
