import { useHook, useMutationHook } from "@common/utils/use-hook"

const useAddItem = () => {
  const hook = useHook(hooks => hooks?.cart.useAddItem)

  return useMutationHook({...hook})
}

export default useAddItem
