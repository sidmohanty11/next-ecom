import { createContext, ReactNode, useContext, useMemo } from "react"
import { ApiConfig, ApiHooks, ApiProviderCtxValue } from "./types/api"

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
      hooks
    }
  }, [config.fetch, hooks])

  return (
    <ApiContext.Provider value={coreConfig}>
      { children }
    </ApiContext.Provider>
  )
}

export const useApiProvider = () => {
  return useContext(ApiContext) as ApiProviderCtxValue
}
