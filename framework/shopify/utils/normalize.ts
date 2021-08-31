import { Product as ShopifyProduct, ImageEdge, MoneyV2, ProductOption, ProductVariantConnection, SelectedOption } from "../schema"
import { Product } from "@common/types/product"

function normalizeProductImages({ edges }: { edges: ImageEdge[]}) {
  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
    return { 
      url: `/images/${url}`,
      ...rest
    }
  })
}

const normalizeProductPrice = ({currencyCode, amount}: MoneyV2) => ({
  value: +amount,
  currencyCode
})

const normalizeProductOption = ({ id, values, name: displayName }: ProductOption) => {
  const normalized = {
    id, displayName,
    values: values.map(val => {
      let output: any = {
        label: val
      }

      if (displayName.match(/colou?r/gi)) {
        output = {
          ...output,
          hexColor: val
        }
      }

      return output
    })
  }

  return normalized
}

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges.map(({ node }) => {
    const {
      id,
      sku,
      title,
      priceV2,
      selectedOptions,
      compareAtPriceV2
    } = node

    return {
      id,
      sku: sku || id,
      title,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) => {
        const option = normalizeProductOption({ id, values: [value], name })

        return option
      })
    }
  })
}

export function normalizeProduct(node: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageCollection,
    priceRange,
    options,
    variants,
    ...rest
  } = node
  
  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ""),
    images: normalizeProductImages(imageCollection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    options: options ? options.filter(o => o.name !== "Title").map(o => (
      normalizeProductOption(o)
    )) : [],
    variants: variants ? normalizeProductVariants(variants) : [],
    ...rest
  }

  return product
}
