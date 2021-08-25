import getAllProductsQuery from "../utils/queries/get-all-products"
import fetchApi from "../utils/fetch-api"

// getAllProducts returns the data by calling fetchApi function
// and passing down the graphql query
export const getAllProducts = async (): Promise<any[]> => {
  const { data } = await fetchApi({ query: getAllProductsQuery })
  return data
}
