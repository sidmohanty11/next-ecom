import useCart from "@common/cart/use-cart"
import { useRemoveItem } from "@common/cart"
import { Cart } from "@common/types/cart"
import { MutationHook } from "@common/types/hooks"
import { CheckoutLineItemsRemovePayload } from "@framework/schema"
import { checkoutToCart, getCheckoutId } from "@framework/utils"
import checkoutLineItemRemoveMutation from "@framework/utils/mutations/checkout-line-items-remove"
import { UseRemoveItem } from "@common/cart/use-remove-item"

export default useRemoveItem as UseRemoveItem<typeof handler>

export type RemoveItemDescriptor = {
  fetcherInput: {
    id: string
  }
  fetcherOutput: {
    checkoutLineItemsRemove: CheckoutLineItemsRemovePayload
  }
  data: Cart
}

export const handler: MutationHook<RemoveItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemRemoveMutation,
  },
  async fetcher({ input: { id }, options, fetch }: any) {
    const { data }: any = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItemIds: [id]
      }
    })

    const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout)
    return cart
  },
  useHook: ({ fetch }: any) => () => {
    const { mutate } = useCart()

    return async (input: any) => {
      const res = await fetch(input)
      await mutate(res, false)
      
      return res
    }
  }
}