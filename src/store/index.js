import { createStore } from 'vuex'
import { getFileList, reducify } from '@/util'

export default createStore({
  modules: reducify(getFileList(require.context('@/store/modules/', true, /module.js/)), name => ({
    [name]: require(`./modules/${name}/module`).default
  }))
})
