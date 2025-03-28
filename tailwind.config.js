module.exports = {
  content: ["./src/**/*.{svelte,js,css,scss}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        mono: ['"Fira Code"', 'monospace'],
      },
      listStyleType: {
        circle: 'circle',
      },
      colors: {
        primary: "#685cd7",
        fade: "#d1ceec",
        secondary: "#ff0000",
        background: "#f3f3f3",
        white: "#ffffff",
        warn: "#DC2626"
      }
    },
    fontFamily: {
      'sans': 'Roboto, nunito, Helvetica, Arial, sans-serif',
    }
  },
  plugins: [require('@tailwindcss/typography')],
}