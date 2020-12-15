import { reducify } from '@/util'
import { sdb, ldb } from '@/util/storage'
import { S_KEYS, L_KEYS } from '@/store/sync'

const STATE_DEFAULT_VALUE = ''

const createState = stateInitConfig =>
  reducify(stateInitConfig, y => {
    let [key, value = STATE_DEFAULT_VALUE] = y
    if (S_KEYS[key]) value = sdb.get(key, value)
    else if (L_KEYS[key]) value = ldb.get(key, value)
    return { [key]: value }
  })

export const createModule = stateInitConfig => {
  const state = createState(stateInitConfig)
  const keyList = Object.keys(state)
  return {
    state,
    getters: reducify(keyList, y => ({ [y]: state => state[y] })),
    mutations: reducify(keyList, y => ({
      [y]: (state, data) => {
        state[y] = data
        if (S_KEYS[y]) sdb.set(y, data)
        else if (L_KEYS[y]) ldb.set(y, data)
      }
    }))
  }
}
