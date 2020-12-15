import { getJson } from './index'
const KEY_PREFIX = process.env.VUE_APP_NAME || 'webapp'

class Storage {
  constructor(db = 'session', keyPrefix = KEY_PREFIX) {
    this.keyPrefix = keyPrefix
    this.storage = window[`${db}Storage`]
  }
  set(k, v) {
    const key = `${this.keyPrefix}_${k}`
    const value = JSON.stringify(v)
    try {
      this.storage.setItem(key, value)
      return true
    } catch (e) {
      return false
    }
  }
  get(k, defaultValue = null) {
    const key = `${this.keyPrefix}_${k}`
    const value = this.storage.getItem(key)
    if (['undefined', 'null', null].indexOf(value) > -1) return defaultValue
    return getJson(value, defaultValue)
  }
  clear() {
    this.storage.clear()
  }
}

export const sdb = new Storage()
export const ldb = new Storage('local')
