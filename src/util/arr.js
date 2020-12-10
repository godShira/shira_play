export const getIndexByFn = (arr, fn, defaultIndex = -1) => {
  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i])) return i
    }
  }
  return defaultIndex
}

export const findBy = (arr, value, prop = 'value', defaultIndex = -1) =>
  getIndexByFn(arr, item => item[prop] === value, defaultIndex)
