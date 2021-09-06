import { useAddItem } from "@common/cart"
import { MutationHook } from "@common/types/hooks"

export default useAddItem

export const handler: MutationHook = {
  fetcher: ({ input, fetch }) => {
    const res = fetch(input)
    return res
  },
  useHook: ({ fetch }) => {
    return (input: any) => {
      const res = fetch(input)
      return {
        output: res
      }
    }
  }
}
