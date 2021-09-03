import { ReactNode } from "react"
import { getConfig } from "./api/config"
import { shopifyHooks } from "./hooks"
import { 
  ApiProvider as CoreApiProvider,
  useApiProvider as useApiProviderCore 
} from "@common"

const config = getConfig()

interface ShopifyApiProviderProps {
  children: ReactNode | ReactNode[]
}

export const ApiProvider = ({ children }: ShopifyApiProviderProps) => {
  return (
    <CoreApiProvider config={{...config}} hooks={shopifyHooks}>
      {children}
    </CoreApiProvider>
  )
}

export const useApiProvider = () => {
  return useApiProviderCore()
}
