/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        mainColor:"#02A9F7",
        mainSubColor:"#D4F0FC",
        cancelColor:"#D10B0B",
        acceptColor:"#03B700",
        secondaryTextColor:"#9098B1",
        inputBorderColor:"#EBF0FF",
        inputBackgroundColor:"#FBFBFB",
        reviewColor:"#C4C805",
        processingColor:"#0F01B5"
      }
    },
  },
  plugins: [],
}
