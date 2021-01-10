module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  fill: theme => ({
    'red': theme('colors.red.500'),
    'green': theme('colors.green.500'),
    'blue': theme('colors.blue.500'),
  }),
  plugins: [],
}
