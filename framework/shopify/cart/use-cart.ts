import useCart from '@common/cart/use-cart'
import { createCheckout, getCheckoutQuery, checkoutToCart } from '@framework/utils';
import { useMemo } from 'react';

export default useCart

export const handler = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }:any) {
    let checkout;

    if (checkoutId) {
      const { data } = await fetch({...options, variables: { checkoutId }})

      checkout = data.node
    } else {
      checkout = await createCheckout(fetch)
    }

    const cart = checkoutToCart(checkout)

    return cart
  },
  useHook: ({ useData }: any) => {
    const data = useData({
      swrOptions: { revalidateOnFocus: false }
    })
    return useMemo(() => data, [data])
  },
}
