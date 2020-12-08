import { h, ref, watch, getCurrentInstance } from 'vue'
import { mountComponent, usePopupState } from '../util/mount-component'
import MyToast from '../components/my-toast/index'

const defaultOptions = {
  icon: '',
  type: 'text',
  message: '',
  className: 'my-toast',
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 2000,
  teleport: 'body',
  iconPrefix: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false
}

// default options of specific type
let defaultOptionsMap = {}
let queue = []
let allowMultiple = false
let currentOptions = {
  ...defaultOptions
}

function parseOptions(message) {
  if (message !== null && typeof message === 'object') {
    return message
  }
  return { message }
}

function createInstance() {
  const { instance, unmount } = mountComponent({
    setup() {
      const message = ref()
      const { open, state, close, toggle } = usePopupState()
      const onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter(item => item !== instance)
          unmount()
        }
      }
      watch(message, value => {
        state.message = value
      })
      getCurrentInstance().render = () =>
        h(MyToast, {
          ...{
            ...state,
            onClosed,
            'onUpdate:show': toggle
          }
        })
      return {
        open,
        clear: close,
        message
      }
    }
  })
  return instance
}

function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance = createInstance()
    queue.push(instance)
  }
  return queue[queue.length - 1]
}

function Toast(options = {}) {
  const toast = getInstance()
  options = parseOptions(options)
  options = {
    ...currentOptions,
    ...defaultOptionsMap[options.type || currentOptions.type],
    ...options
  }
  toast.open(options)
  return toast
}

const createMethod = type => options =>
  Toast({
    type,
    ...parseOptions(options)
  })

;['loading', 'success', 'fail'].forEach(method => {
  Toast[method] = createMethod(method)
})

Toast.clear = all => {
  if (queue.length) {
    if (all) {
      queue.forEach(toast => {
        toast.clear()
      })
      queue = []
    } else if (!allowMultiple) {
      queue[0].clear()
    } else {
      queue.shift().clear()
    }
  }
}

Toast.setDefaultOptions = (type, options) => {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options
  } else {
    Object.assign(currentOptions, type)
  }
}

Toast.resetDefaultOptions = type => {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null
  } else {
    currentOptions = { ...defaultOptions }
    defaultOptionsMap = {}
  }
}

Toast.allowMultiple = (value = true) => {
  allowMultiple = value
}

Toast.install = app => {
  app.component(MyToast)
  app.config.globalProperties.$toast = Toast
}

export default Toast
