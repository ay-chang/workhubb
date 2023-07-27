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
        "muted-blue-100": "#e0e3e8",
        "muted-blue-200": "#dce7f2",
        "muted-blue-300": "#ccdef0",
        "muted-blue-400": "#bbd4ed",
      },
      lineClamp: {
        25: "25",
      },
    },
  },
  plugins: [],
};
