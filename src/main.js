import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { myComponents } from './components'

import '@/assets/style/index.scss'
import Dialog from './plugins/dialog'
import Toast from './plugins/toast'

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_IS_PROD === 'false') {
  const VConsole = require('vconsole')
  new VConsole()
  console.log(`${location.href}@${process.env.VUE_APP_VERSION}`)
}

const app = createApp(App)
app
  .use(store)
  .use(router)
  .use(Dialog)
  .use(Toast)
  .mount('#app')

myComponents.forEach(name => app.component(name, require(`@/components/${name}`).default))
