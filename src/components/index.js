import { getFileList } from '@/util'

const myComponents = getFileList(require.context('@/components/', true, /index.vue/))

export default {
  install(app) {
    myComponents.map(name => app.component(name, require(`@/components/${name}`).default))
  }
}
