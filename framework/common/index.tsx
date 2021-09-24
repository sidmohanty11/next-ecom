import { createContext, ReactNode, useContext, useMemo } from "react"
import { ApiConfig, ApiProviderCtxValue } from "./types/api"
import { ApiHooks } from "./types/hooks"

interface ApiProviderProps {
  children: ReactNode | ReactNode[]
  config: ApiConfig,
  hooks: ApiHooks
}

export const ApiContext = createContext<Partial<ApiProviderCtxValue>>({})
export const ApiProvider = ({
  children, config, hooks
}: ApiProviderProps) => {
  const coreConfig = useMemo(() => {
    return {
      fetcher: config.fetch,
      hooks,
      checkoutCookie: config.checkoutCookie
    }
  }, [config.fetch, hooks, config.checkoutCookie])

  return (
    <ApiContext.Provider value={coreConfig}>
      { children }
    </ApiContext.Provider>
  )
}

export const useApiProvider = () => {
  return useContext(ApiContext) as ApiProviderCtxValue
}
