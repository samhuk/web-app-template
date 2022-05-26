export const pushIfNotExists = <T = any>(array: T[], item: T): void => {
  if (array.indexOf(item) === -1)
    array.push(item)
}

export const removeAtIndex = <T = any>(array: T[], index: number | ((item: T, i: number) => boolean)): number => {
  if (index == null)
    return null

  const _index = typeof index === 'number' ? index : array.findIndex(index)
  if (_index >= 0 && _index <= array.length - 1)
    array.splice(_index, 1)

  return _index
}

export const removeLastEntry = <T = any>(array: T[]): T => {
  if (array.length === 0)
    return null

  return array.splice(array.length - 1, 1)[0]
}
