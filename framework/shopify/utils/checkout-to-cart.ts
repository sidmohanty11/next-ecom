import { Checkout, Maybe } from "@framework/schema"
import { normalizeCart } from "."

const checkoutToCart = (checkout?: Maybe<Checkout>) => {
  if (!checkout) {
    throw new Error("Missing checkout object")
  }

  return normalizeCart(checkout)
}

export default checkoutToCart