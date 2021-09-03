import { ReactNode } from "react"
import { getConfig } from "./api/config"
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
    <CoreApiProvider config={config}>
      {children}
    </CoreApiProvider>
  )
}

export const useApiProvider = () => {
  return useApiProviderCore()
}
