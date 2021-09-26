import useCart, { UseCart } from '@common/cart/use-cart'
import { Cart } from '@common/types/cart';
import { SWRHook } from '@common/types/hooks';
import { Checkout } from '@framework/schema';
import { createCheckout, getCheckoutQuery, checkoutToCart } from '@framework/utils';
import { useMemo } from 'react';

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string
  }
  fetcherOutput: {
    node: Checkout
  }
  data: Cart
}

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }) {
    let checkout: Checkout

    if (checkoutId) {
      const { data } = await fetch({...options, variables: { checkoutId }})

      checkout = data.node
    } else {
      checkout = await createCheckout(fetch as any)
    }

    const cart = checkoutToCart(checkout)

    return cart
  },
  useHook: ({ useData }) => ()=> {
    const res = useData({
      swrOptions: { revalidateOnFocus: false }
    })
    return useMemo(() => (
      { ...res, isEmpty: (res.data?.lineItems.length ?? 0) <= 0 }
      ), [res])
  },
}
