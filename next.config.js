const { withFrameworkConfig } = require('./framework/common/config')

module.exports = withFrameworkConfig({
  reactStrictMode: true,
  framework: {
    name: process.env.NEXT_PUBLIC_FRAMEWORK,
  },
})
