import { getFileList } from '@/util'

export const myComponents = getFileList(require.context('@/components/', true, /index.vue/))
