/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        textColor: "#000",
        textVariantColor: "#E8D4D1",
        textConstrastColor: "#fff",
        backgroundColor: "#D0C2AE",
        noneColor: "#00000000",
        backgroundInputColor: "#E4DACB",
        imageBackgroundColor: "#D0C2AE",
        borderColor: "#ECE2D3",
        primaryColor: "#967259",
        primaryLightColor: "#EBF0FF",
        secondaryColor: '#1D464A',
        errColor: "#F71B38",
        warnColor: "#EFEA3C",
        successColor: "#03B700",
        processColor: "#0F01B5",
      },
    },
  },
  plugins: [],
};
