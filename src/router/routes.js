import { getFileList } from '@/util'

const createPageRoute = name => ({
  name,
  path: `/${name}`,
  component:
    process.env.NODE_ENV === 'development' ? require(`@/pages/${name}`).default : () => import(`@/pages/${name}`)
})

import Home from '@/pages/home'

const pages = getFileList(require.context('@/pages/', true, /index.vue/))

export const routes = [
  ...pages.map(createPageRoute),
  {
    path: '/:catchAll(.*)',
    redirect: `/${Home.name}`
  }
]
