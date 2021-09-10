import { useAddItem } from '@common/cart'
import { MutationHook } from '@common/types/hooks'
import { getCheckoutId } from '@framework/utils'
import { checkoutLineItemsAdd } from '@framework/utils/mutations'

export default useAddItem

export const handler: MutationHook = {
  fetcherOptions: { query: checkoutLineItemsAdd },
  fetcher: ({ options, fetch, input }) => {
    const res = fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItems: [{ variantId: input.variantId, quantity: 1 }],
      },
    })

    return res
  },
  useHook: ({ fetch }) => {
    return async (input: any) => {
      const res = await fetch(input)

      return {
        output: res,
      }
    }
  },
}
