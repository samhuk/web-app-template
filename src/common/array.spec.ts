import { removeLastEntry } from './array'

describe('array', () => {
  test('removeLastEntry', () => {
    const fn = removeLastEntry

    const array = [1, 2, 3]
    const result = fn(array)

    expect(array).toEqual([1, 2])
    expect(result).toBe(3)
  })
})
