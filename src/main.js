import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { myComponents } from './components'

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_IS_PROD === 'false') {
  const VConsole = require('vconsole')
  new VConsole()
  console.log(`${location.href}@${process.env.VUE_APP_VERSION}`)
}

const app = createApp(App)
app
  .use(store)
  .use(router)
  .mount('#app')

myComponents.forEach(name => app.component(name, require(`@/components/${name}`).default))
