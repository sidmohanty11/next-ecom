import { SWRResponse } from 'swr'
import { ApiFetcher, ApiFetcherOptions } from './api'

export type MutationHookCtx<Input, Output> = {
  fetch: (input: Input) => Promise<Output>
}

export interface ApiHooks {
  cart: {
    useAddItem: MutationHook
    useCart: SWRHook
    useRemoveItem: MutationHook
    useUpdateItem: MutationHook
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

export type SWRHookContext<Input, Output> = {
  useData: (input: Input) => Promise<Output>
}

export type UseDataCtx = {
  swrOptions: any
}

export type SWRHookResponse<Data> = SWRResponse<Data, any> & { isEmpty: boolean }

export type UseData<Data> = (ctx: UseDataCtx) => Data

export type SWRHook<H extends HookDescriptor = any> = {
  fetcherOptions: HookFetcherOptions
  fetcher: HookFetcherFn<
    H["fetcherInput"],
    H["fetcherOutput"],
    H["data"]
  >
  useHook(
    context: {
      useData: UseData<SWRHookResponse<H["data"]>>
    }
  ): () => SWRHookResponse<H["data"]>
}

export type Hook = MutationHook | SWRHook