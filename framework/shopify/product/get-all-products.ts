import { normalizeProduct, getAllProductsQuery } from '../utils'
import { ProductConnection } from '../schema'
import { Product } from '@common/types/product'
import { ApiConfig } from '@common/types/api'

type ReturnType = { products: ProductConnection }

// getAllProducts returns the data by calling fetchApi function
// and passing down the graphql query
const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<ReturnType>({
    query: getAllProductsQuery,
  })
  const products =
    data.products.edges.map(({ node }) => normalizeProduct(node)) ?? []
  return products
}

export default getAllProducts
