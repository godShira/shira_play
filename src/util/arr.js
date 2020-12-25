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

const groupBy = (list, key, key1) => {
  const newList = list.reduce((prevValue, currentValue) => {
    let index = -1
    prevValue.some((item, i) => {
      if (item[key] === currentValue[key]) {
        index = i
        return true
      }
    })
    if (index > -1) {
      prevValue[index].children.push(currentValue)
    } else {
      prevValue.push({
        [key]: currentValue[key],
        label: currentValue[key],
        children: [{ ...currentValue, label: currentValue[key1] }]
      })
    }
    return prevValue
  }, [])
  return newList
}
export const groupArr = () => {
  import('./all.json').then(res => {
    const list = res.data
    console.log(groupBy(list, 'province', 'city'))
  })
}
