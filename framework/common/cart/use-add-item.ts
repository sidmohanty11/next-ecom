import { useHook } from "@common/utils/use-hook"

const useAddItem = () => {
  const hook = useHook(hooks => hooks?.cart.useAddItem)

  return hook.useHook({
    fetch: hook.fetcher
  })
}

export default useAddItem
