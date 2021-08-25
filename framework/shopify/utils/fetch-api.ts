import { ApiFetcherOptions, ApiFetcherResults } from "@common/types/api"

// fetchApi function fetches data from the fake shopify graphql api
// and in case of any error, it throws it
const fetchApi = async <T>({
  url, 
  query }: ApiFetcherOptions): Promise<ApiFetcherResults<T>> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })

  const { data, errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message ?? errors.message)
  }

  return { data }
}

export default fetchApi