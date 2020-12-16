import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import components from '@/components'
import plugins from '@/plugins'

import '@/assets/style/index.scss'

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_IS_PROD === 'false') {
  const VConsole = require('vconsole')
  new VConsole()
  console.log(`${location.href}@${process.env.VUE_APP_VERSION}`)
}

const app = createApp(App)
app
  .use(router)
  .use(store)
  .use(plugins)
  .use(components)
  .mount('#app')
