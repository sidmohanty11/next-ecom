import { useAddItem } from "@common/cart"
import { MutationHook } from "@common/types/hooks"

export default useAddItem

export const handler: MutationHook = {
  fetcher: (input: any) => {
    return JSON.stringify(input) + '_Modified'
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
