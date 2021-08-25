// fetchApi function fetches data from the fake shopify graphql api
// and in case of any error, it throws it
const fetchApi = async ({ query }: { query: string }) => {
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