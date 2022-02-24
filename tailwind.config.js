let colors = require("tailwindcss/colors")

module.exports = {
  content: ['./public/index.html', './src/**/*.svelte'],
  plugins: [
    require('a17t'),
  ],
  theme: {
      extend: {
          colors: {
            neutral: colors.slate,
            positive: colors.green,
            urge: colors.violet,
            warning: colors.yellow,
            info: colors.blue,
            critical: colors.red,
          }
      },
  },
}
