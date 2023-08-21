module.exports = {
  content: ['_site/**/*.html'],
  safelist: [],
  theme: {
    extend: {
      colors: {
        change: 'slate-600',
        neutral: "",
        accent: {
          1000: "#00082A",
          900: "#010E3D",
          800: "#001142",
          400: "#0B35B3",
          300: "#65C1FF",
          250: "#B6E0FF",
          200: "#A9DDFF",
          100: "#F1F4FE" 
        },
        
      },
    },
    fontFamily: {
      sans: ['Barlow', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
