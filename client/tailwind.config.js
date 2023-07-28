/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        myblack : "#000000e5",
        thisblack : '#0000003e',
        
      }
    },
  },
  plugins: [],
}

