// fetchApi function fetches data from the fake shopify graphql api
// and in case of any error, it throws it
type FetcherParams = { query: string }
type FetcherResult<T> = { data: T }

const fetchApi = async <T>({ query }: FetcherParams): Promise<FetcherResult<T>> => {
  const URL = 'http://localhost:4000/graphql'

  const res = await fetch(URL, {
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