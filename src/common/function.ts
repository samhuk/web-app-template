// eslint-disable-next-line import/prefer-default-export
export const debounce = <TArgs extends any[], TReturn>(fn: (...args: TArgs) => TReturn, debounceMs: number = 250) => {
  let currentTimeout: NodeJS.Timeout = null
  return (...args: TArgs) => {
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => {
      fn(...args)
    }, debounceMs)
  }
}