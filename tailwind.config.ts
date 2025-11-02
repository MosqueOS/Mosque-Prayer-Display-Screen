import type { Config } from "tailwindcss"

const primaryColor       = process.env.THEME_COLOR_PRIMARY     || '#0F715D';
const primaryAltColor    = process.env.THEME_COLOR_PRIMARY_ALT || '#0C5A4B';
const onPrimaryColor     = process.env.THEME_COLOR_ON_PRIMARY     || '#FFFFFF';
const onPrimaryAltColor  = process.env.THEME_COLOR_ON_PRIMARY_ALT || '#FFFFFF';
const highlightColor     = process.env.THEME_COLOR_HIGHLIGHT   || '#10b981';

const config: Config = {
  content: [  
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "lg:grid-cols-5",
    "lg:grid-cols-4",
    "lg:grid-cols-3",
    "lg:grid-cols-2",
    "lg:grid-cols-1",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mosqueBrand: {
          highlight: highlightColor,
          DEFAULT: primaryColor,
          primary: primaryColor,
          primaryAlt: primaryAltColor,
          onPrimary: onPrimaryColor,
          onPrimaryAlt: onPrimaryAltColor,
        },
      },
    },
  },
  plugins: [],
}
export default config
