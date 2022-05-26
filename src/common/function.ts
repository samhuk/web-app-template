export const debounce = <TArgs extends any[], TReturn>(fn: (...args: TArgs) => TReturn, debounceMs: number = 250) => {
  let currentTimeout: NodeJS.Timeout = null
  return (...args: TArgs) => {
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => {
      fn(...args)
    }, debounceMs)
  }
}

export const merge = <TFn extends ((...args: any[]) => any)>(...fns: TFn[]): (...args: Parameters<TFn>) => ReturnType<TFn>[] => (
  ...args
) => fns.map(fn => fn(...args))

export const loop = (
  fn: (next: (delayMs?: number) => void, i: number) => void,
) => {
  const next = (i: number) => fn(delayMs => {
    if (delayMs == null)
      next(i + 1)
    else
      setTimeout(() => next(i + 1), delayMs)
  }, i)
  next(0)
}
