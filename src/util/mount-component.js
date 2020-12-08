import { createApp, reactive, nextTick, getCurrentInstance } from 'vue'
function useExpose(apis) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy, apis)
  }
}
export function usePopupState() {
  const state = reactive({
    show: false
  })

  const toggle = show => {
    state.show = show
  }
  const open = props => {
    Object.assign(state, props)

    nextTick(() => {
      toggle(true)
    })
  }
  const close = () => {
    toggle(false)
  }
  useExpose({ open, close, toggle })
  return {
    open,
    close,
    state,
    toggle
  }
}

export function mountComponent(RootComponent) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')
  document.body.appendChild(root)
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount(root)
      document.body.removeChild(root)
    }
  }
}
