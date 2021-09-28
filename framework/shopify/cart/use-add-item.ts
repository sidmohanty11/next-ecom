import { useAddItem } from '@common/cart'
import { UseAddItem } from '@common/cart/use-add-item'
import useCart from '@common/cart/use-cart'
import { Cart } from '@common/types/cart'
import { MutationHook } from '@common/types/hooks'
import { CheckoutLineItemsAddPayload } from '@framework/schema'
import { checkoutToCart, getCheckoutId } from '@framework/utils'
import { checkoutLineItemsAdd } from '@framework/utils/mutations'

export default useAddItem as UseAddItem<typeof handler>

export type AddItemHookDescriptor = {
  fetcherInput: {
    variantId: string
    quantity: number
  }
  fetcherOutput: {
    checkoutLineItemsAdd: CheckoutLineItemsAddPayload
  }
  data: Cart
}

export const handler: MutationHook<AddItemHookDescriptor> = {
  fetcherOptions: { query: checkoutLineItemsAdd },
  fetcher: async ({fetch, options, input}) => {

    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [
        {
         variantId: input.variantId,
         quantity: 1
        }
      ]
    }

    const { data } = await fetch({
       ...options,
       variables
    })

    const cart = checkoutToCart(data.checkoutLineItemsAdd.checkout)
    return cart
  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCart()

    return async (input) => {
      const res = await fetch(input)
      await mutate(res, false)
      
      return res
    }
  },
}
