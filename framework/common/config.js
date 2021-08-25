const path = require('path')
const fs = require('fs')
const merge = require('deepmerge')
const ALLOWED_FW = ["shopify", "bigcommerce", "shopify_local"]

function withFrameworkConfig(defaultConfig = {}) {
  let framework = defaultConfig?.framework?.name
  
  if (!framework || !ALLOWED_FW.includes(framework)) {
    throw new Error("The API framework is missing, add a valid provider in next.config.js")
  }

  if (framework === "shopify_local") {
    framework = ALLOWED_FW[0] // or "shopify"
  }

  const frameworkNextConfig = require(path.join("../", framework, "next.config"))
  const config = merge(defaultConfig, frameworkNextConfig)

  const tsPath = path.join(process.cwd(), "tsconfig.json")
  const tsconfig = require(tsPath)
  tsconfig.compilerOptions.paths["@framework"] = [`framework/${framework}`]
  tsconfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`]
  fs.writeFileSync(tsPath, JSON.stringify(tsconfig, null, 2))

  return config
}

module.exports = { withFrameworkConfig }