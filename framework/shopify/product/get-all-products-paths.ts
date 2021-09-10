import { Product } from '@common/types/product'
import { ApiConfig } from '@common/types/api'
import getAllProductsPathQuery from '@framework/utils/queries/get-all-products-path'
import { ProductConnection } from '@framework/schema'

type ReturnType = {
  products: Pick<Product, 'slug'>[]
}

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
  const { data } = await config.fetch<{ products: ProductConnection }>({
    query: getAllProductsPathQuery,
  })
  const products = data.products.edges.map(({ node: { handle } }) => {
    return {
      slug: handle,
    }
  })

  return { products }
}

export default getAllProductsPaths
