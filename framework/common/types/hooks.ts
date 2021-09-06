import { ApiFetcher } from "./api"

export type MutationHookCtx = {
  fetch: (input: any) => any
}

export type FetcherHookCtx = {
  input: any
  fetch: ApiFetcher
}

export type MutationHook = {
  fetcher: (context: FetcherHookCtx) => any
  useHook: (context: MutationHookCtx) => (input: any) => any
}
