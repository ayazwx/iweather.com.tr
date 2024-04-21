import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "product": "#8FB2F5",
        'base': {
          "900": "#13131A",
          "800": "#16161F",
          "700": "#1C1C27",
          "600": "#22222F",
          "500": "#3B3B54",
          "400": "#7F7F98",
          "200": "#BFBFD4",
          "100": "#FAFAFA",
          "white": "#FFFFFF"
        }
      },
      screens: {
        sm: { max: "767px" },

        md: { min: "768px", max: "1023px" },

        lg: { min: "1024px", max: "1279px" },

        xl: { min: "1280px", max: "1535px" },

        desk: { min: "768px" },

        "2xl": { min: "1536px" },
      },
    },
  },
  plugins: [],
};
export default config;
