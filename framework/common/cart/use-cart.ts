import { useApiProvider } from '@common'
import { ApiHooks } from '@common/types/hooks'
import { useHook, useSWRHook } from '@common/utils/use-hook'
import Cookies from 'js-cookie'

const useCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart)
  const { checkoutCookie } = useApiProvider()

  const fetcherWrapper: typeof hook.fetcher = (ctx) => {
    ctx.input.checkoutId = Cookies.get(checkoutCookie)
    return hook.fetcher(ctx)
  }

  return useSWRHook({ ...hook, fetcher: fetcherWrapper })
}

export default useCart
