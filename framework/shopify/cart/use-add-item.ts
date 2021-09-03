import { useAddItem } from "@common/cart"

export default useAddItem

export const handler = {
  fetcher: () => {
    console.log("fetching")
  },
  useHook: () => {
    return (input: any) => {
      return {
        output: JSON.stringify(input) + '_modified'
      }
    }
  } 
}
