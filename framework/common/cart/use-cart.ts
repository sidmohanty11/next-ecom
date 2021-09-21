import { ApiHooks } from '@common/types/hooks'
import { useHook, useSWRHook } from '@common/utils/use-hook'

const useCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart)
  return useSWRHook({ ...hook })
}

export default useCart
