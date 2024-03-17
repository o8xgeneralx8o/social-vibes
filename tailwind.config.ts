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
        'black-vibes': '#010001',
        'orange-vibes': '#CD6548',
      }
    }
  },

  plugins: [],
};
export default config;
