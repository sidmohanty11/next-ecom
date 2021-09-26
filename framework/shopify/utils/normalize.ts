import { Product as ShopifyProduct, ImageEdge, MoneyV2, ProductOption, ProductVariantConnection, SelectedOption, Checkout, CheckoutLineItemEdge } from "../schema"
import { Product } from "@common/types/product"
import { Cart } from "@common/types/cart"

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
      name: title,
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

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    priceRange,
    options,
    variants,
    ...rest
  } = productNode

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ""),
    images: normalizeProductImages(imageConnection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    options: options ?
      options.filter(o => o.name !== "Title")
             .map(o => normalizeProductOption(o)) : [],
    variants: variants ?
      normalizeProductVariants(variants) : [],
    ...rest
  }

  return product
}

const normalizeLineItem = ({ node: { id, title, variant, ...rest } }: CheckoutLineItemEdge): any => {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: title,
    path: String(variant?.product?.handle) ?? "",
    discounts: [],
    options: variant?.selectedOptions.map(({ name, value }: SelectedOption) => {
      const option = normalizeProductOption({ id, values: [value], name })
      return option
    }),
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? "",
      name: variant?.title,
      image: {
        url: process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local" ?
         `/images/${variant?.image?.originalSrc}` :
          variant?.image?.originalSrc ?? "/placeholder.svg"
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    ...rest
  }
}

export const normalizeCart = (checkout: Checkout): Cart => {
  return {
    id: checkout.id,
    createdAt: checkout.createdAt,
    currency: {
      code:checkout.totalPriceV2.currencyCode
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2.amount,
    totalPrice: checkout.totalPriceV2.amount,
    discounts: [],
    lineItems: checkout.lineItems.edges.map(normalizeLineItem),
  }
}