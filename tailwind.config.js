/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
        "primary-blue": "#2c6ef2",
        "secondary-blue": "#4086f7",
        "muted-blue-100": "#e9f3f7",
        "muted-blue-200": "#daedf5",
      },
      lineClamp: {
        25: "25",
      },
    },
  },
  plugins: [],
};
