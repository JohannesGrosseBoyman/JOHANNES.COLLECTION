/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js App Router
    "./components/**/*.{js,ts,jsx,tsx}", // If you have a components folder
    "./pages/**/*.{js,ts,jsx,tsx}", // If you use Pages Router
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#006994", // Your main brand color
        secondary: "#F35C7A",
        accent: "#ffcc00",
      },
    },
  },
  plugins: [],
};

export default config;
