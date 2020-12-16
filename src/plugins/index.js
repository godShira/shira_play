import Dialog from './dialog'
import Toast from './toast'

const myPlugins = [Dialog, Toast]

export default {
  install(app) {
    myPlugins.map(plg => app.use(plg))
  }
}
