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
        "muted-blue-100": "#f0f5fa",
        "muted-blue-200": "#e6f2fc",
        "muted-blue-300": "#d9ebfa",
        "muted-blue-400": "#d1eaff",
        "muted-blue-500": "#c2e3ff",
        "pastel-blue-100": "#8d9fa6",

        "beige-100": "#fffcf7",
      },
      lineClamp: {
        25: "25",
      },
      spacing: {
        "18%": "18%",
        "2%": "2%",
        "3%": "3%",
      },
      width: {
        "3/10": "30%",
      },
    },
  },
  plugins: [],
};
