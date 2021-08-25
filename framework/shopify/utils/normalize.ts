import { Product as ShopifyProduct, ImageEdge } from "../schema"
import { Product } from "@common/types/product"

function normalizeProductImages({ edges }: { edges: ImageEdge[]}) {
  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
    return { 
      url: `/images/${url}`,
      ...rest
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
    ...rest
  }

  return product
}