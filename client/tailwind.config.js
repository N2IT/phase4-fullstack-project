/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",               // Main HTML file in the /client directory
    "./src/**/*.{js,ts,jsx,tsx}", // All files in the /client/src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}