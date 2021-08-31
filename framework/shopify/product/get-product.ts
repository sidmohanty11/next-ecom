import { ApiConfig } from "@common/types/api"
import { getProductQuery, normalizeProduct } from "@framework/utils"
import { Product as ShopifyProduct } from "@framework/schema"
import { Product } from "@common/types/product"

type FetchType = {
  productByHandle: ShopifyProduct
}

type ReturnType = {
  product: Product | null
}

const getProduct = async (options: {
  config: ApiConfig, variables: { [key: string]: string | undefined }
}): Promise<ReturnType> => {
  const { config, variables } = options
  const { data } = await config.fetch<FetchType>({
    query: getProductQuery, url: config.apiUrl, variables
  })

  const { productByHandle } = data

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null
  }
}

export default getProduct