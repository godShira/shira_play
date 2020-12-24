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

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 * @param {*} children
 * @param {*} initid 默认首层 pid
 * 用法 treeData(list) or treeData(list, { pid: 'parentId' })
 */
export const treeData = (data, opt) => {
  let { id = 'id', pid = 'pid', children = 'children', initid = 0 } = opt
  let cloneData = JSON.parse(JSON.stringify(data))
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => father[id] === child[pid])
    branchArr.length > 0 ? (father[children] = branchArr) : ''
    return father[pid] === initid
  })
}
