/**
 * 日期转换
 */
export const formatDate = (date, fmt = 'yyyy-MM-dd') => {
  if (!date) return date
  let d = date instanceof Object ? date : new Date(date)
  const q = 3 // 季度
  let o = {
    'M+': d.getMonth() + 1, //月份
    'd+': d.getDate(), //日
    'h+': d.getHours(), //小时
    'm+': d.getMinutes(), //分
    's+': d.getSeconds(), //秒
    'q+': Math.floor((d.getMonth() + q) / q), //季度
    S: d.getMilliseconds() //毫秒
  }
  const yearNum = 4
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(yearNum - RegExp.$1.length))
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}
