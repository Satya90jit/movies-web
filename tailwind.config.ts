import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      "pulse-skeleton": "pulse-skeleton 1.5s ease-in-out infinite",
    },
    keyframes: {
      "pulse-skeleton": {
        "0%, 100%": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
        "50%": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
