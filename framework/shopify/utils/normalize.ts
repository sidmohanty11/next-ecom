import { Product as ShopifyProduct, ImageEdge, MoneyV2 } from "../schema"
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

export function normalizeProduct(node: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageCollection,
    priceRange,
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
    ...rest
  }

  return product
}
