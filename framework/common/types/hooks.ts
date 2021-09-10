import { ApiFetcher, ApiFetcherOptions } from './api'

export type MutationHookCtx = {
  fetch: (input: any) => any
}

export type FetcherHookCtx = {
  input?: any
  fetch: ApiFetcher
  options: ApiFetcherOptions
}

export type MutationHook = {
  fetcherOptions: ApiFetcherOptions
  fetcher: (context: FetcherHookCtx) => any
  useHook: (context: MutationHookCtx) => (input: any) => any
}
