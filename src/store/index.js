import { getFileList } from '@/util'
export const stores = getFileList(require.context('@/store/modules/', true, /module.js/))
