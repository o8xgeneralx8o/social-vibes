import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-vibes': '#5D2DED',
        'soft-lavander-vibes': '#CDC6FF',
        'green-vibes': '#3CCC6A',
        'transparent-green-vibes': '#92ea7c3f',
        'black-vibes': '#010001',
        'orange-vibes': '#FC6736',
        'soft-grey-vibes': '#F0F2F5',
        'hard-grey-vibes': '#9B9DA1'
      },
      animation: {
        'social-vibes-color': 'changeColor 8s ease infinite',
        'social-vibes-bg': 'changeBg 8s ease infinite',
        'social-vibes-border-color': 'changeBorderColor  8s ease infinite',
        'social-vibes-button': 'changeColor 8s ease infinite, changeBorderColor 8s ease infinite'
      }

    },
  },

  plugins: [],
};
export default config;
