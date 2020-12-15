import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import { stores } from './store'
import { myComponents } from './components'
import { myPlugins } from './plugins'

import '@/assets/style/index.scss'

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_IS_PROD === 'false') {
  const VConsole = require('vconsole')
  new VConsole()
  console.log(`${location.href}@${process.env.VUE_APP_VERSION}`)
}

const app = createApp(App)
app.use(router).mount('#app')

myComponents.forEach(name => app.component(name, require(`@/components/${name}`).default))
for (let key in myPlugins) {
  app.use(myPlugins[key])
}

stores.forEach(name => {
  app.use(createStore(require(`@/store/modules/${name}/module`).default))
})
