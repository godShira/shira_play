import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_IS_PROD === 'false') {
  const VConsole = require('vconsole')
  new VConsole()
  console.log(`${location.href}@${process.env.VUE_APP_VERSION}`)
}

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
