export type MutationHookCtx = {
  fetch: (input: any) => any
}

export type MutationHook = {
  fetcher: (input: any) => any
  useHook: (context: MutationHookCtx) => (input: any) => any
}
