import { ApiConfig } from "@common/types/api";
import { getProductQuery } from "@framework/utils";

const getProduct = async (options: { config: ApiConfig, variables: any }): Promise<any> => {
  const { config, variables } = options
  const { data } = await config.fetch({ query: getProductQuery, url: config.apiUrl, variables })
  return {
    product: {
      name: "",
      slug: ""
    }
  }
}

export default getProduct