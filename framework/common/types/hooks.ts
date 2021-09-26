import { ApiFetcher, ApiFetcherOptions } from './api'

export type MutationHookCtx<Input, Output> = {
  fetch: (input: Input) => Promise<Output>
}

export interface ApiHooks {
  cart: {
    useAddItem: MutationHook
    useCart: any
  }
}

export type FetcherHookCtx<Input, Output> = {
  input: Input
  fetch: ApiFetcher<Output>
  options: ApiFetcherOptions
}

export type HookFetcherOptions = {
  query: string
}

export type HookFetcherFn<Input, Output, Data> = (
  context: FetcherHookCtx<Input, Output>
  ) => Promise<Data>

export type HookDescriptor = {
  fetcherInput: any
  data: any
  fetcherOutput: any
}

export type MutationHook<H extends HookDescriptor = any> = {
  fetcherOptions: HookFetcherOptions
  fetcher: HookFetcherFn<H["fetcherInput"], H["fetcherOutput"], H["data"]>
  useHook(
    context: MutationHookCtx<H["fetcherInput"], H["data"]>
    ): () => (input: H["fetcherInput"]) => Promise<H["data"]>
}
