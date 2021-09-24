import { useApiProvider } from '@common'
import { ApiFetcher } from '@common/types/api'
import { ApiHooks } from '@common/types/hooks'
import { MutationHook } from '@common/types/hooks'
import { useState } from 'react'

export const useHook = (fn: (apiHooks: ApiHooks) => MutationHook) => {
  const { hooks } = useApiProvider()

  return fn(hooks)
}

export const useMutationHook = (hook: MutationHook) => {
  const { fetcher } = useApiProvider()
  return hook.useHook({
    fetch: (input: any) =>
      hook.fetcher({
        input,
        fetch: fetcher,
        options: hook.fetcherOptions,
      }),
  })
}

const useData = (hook: any, fetcher: ApiFetcher) => {
  const [data, setData] = useState(null)

  const hookFetcher = async () => {
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: hook.fetchOptions,
        input: {}
      })
    } catch (err) {
      throw err
    }
  }

  if (!data) {
    hookFetcher().then(data => {
      setData(data)
    })
  }

  return data
}

export const useSWRHook = (hook: any) => {
  const { fetcher } = useApiProvider()
  return hook.useHook({
    useData() {
      const data = useData(hook, fetcher)
      return data
    },
  })
}
