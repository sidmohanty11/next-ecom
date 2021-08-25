import { fetchApi, normalizeProduct, getAllProductsQuery} from "../utils"
import { ProductConnection } from "../schema"
import { Product } from "@common/types/product"

type ReturnType = { products: ProductConnection }

// getAllProducts returns the data by calling fetchApi function
// and passing down the graphql query
export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await fetchApi<ReturnType>({ query: getAllProductsQuery })
  const products = data.products.edges.map(({ node }) => normalizeProduct(node)) ?? []
  return products
}
