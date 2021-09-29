import { ApiFetcherOptions, ApiFetcherResults } from '@common/types/api'
import { API_URL, STOREFRONT_TOKEN } from '@framework/const'

// fetchApi function fetches data from the fake shopify graphql api
// and in case of any error, it throws it
const fetchApi = async <T>({
  query,
  variables,
}: ApiFetcherOptions): Promise<ApiFetcherResults<T>> => {
  const res = await fetch(API_URL!, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN!
    },
    body: JSON.stringify({ query, variables }),
  })

  const { data, errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message ?? errors.message)
  }

  return { data }
}

export default fetchApi
