const SLICER = 2
export const getFileList = ctx => ctx.keys().map(file => file.slice(SLICER, file.lastIndexOf('/')))

export const reducify = (arr, fn = y => ({ [y[0]]: y[1] }), firstState = {}) =>
  arr.reduce(
    (x, y) => ({
      ...x,
      ...fn(y)
    }),
    firstState
  )

export const getJson = (str, defaultValue = null) => {
  let result = defaultValue
  if (typeof str === 'string') str = str.trim()
  if (str) {
    try {
      result = JSON.parse(str)
    } catch (err) {
      console.log('get-json')
      console.log(str)
      console.log(err)
    }
  }
  return result
}
