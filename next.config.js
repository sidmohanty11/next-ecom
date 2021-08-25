const { withFrameworkConfig } = require("./framework/common/config")

module.exports = withFrameworkConfig({
  reactStrictMode: true,
  framework: {
    name: "shopify_local"
  }
})
