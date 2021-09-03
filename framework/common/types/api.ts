export type ApiFetcherOptions = {
  url: string
  query: string
  variables?: { [key: string]: string | undefined }
}

export type ApiFetcherResults<T> = {
  data: T
}

export interface ApiConfig {
  apiUrl: string
  fetch: ApiFetcher
}

export interface ApiHooks {
  cart: {
    useAddItem: any
  }
}

export type ApiFetcher<T = any> = (
  options: ApiFetcherOptions
 ) => Promise<ApiFetcherResults<T>>

export interface ApiProviderCtxValue {
  hooks: ApiHooks,
  fetcher: ApiFetcher
}
