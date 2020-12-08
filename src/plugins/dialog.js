import { h, createApp } from 'vue'
import { mountComponent, usePopupState } from '../util/mount-component'
import MyDialog from '../components/my-dialog/index'

let instance

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle } = usePopupState()
      return () => h(MyDialog, { ...{ ...state, 'onUpdate:show': toggle } })
    }
  }
  const app = createApp(Wrapper)
  const root = document.createElement('div')
  document.body.appendChild(root)
  ;({ instance } = mountComponent(Wrapper))
}

function Dialog(options) {
  // eslint-disable-next-line no-debugger
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance()
    }
    instance.open({
      ...Dialog.currentOptions,
      ...options,
      callback: action => {
        ;(action === 'confirm' ? resolve : reject)(action)
      }
    })
  })
}

Dialog.defaultOptions = {
  title: '',
  width: '',
  theme: null,
  message: '',
  overlay: true,
  callback: null,
  teleport: 'body',
  className: 'my-dialog',
  allowHtml: false,
  lockScroll: true,
  transition: 'van-dialog-bounce',
  beforeClose: null,
  overlayClass: '',
  overlayStyle: null,
  messageAlign: '',
  cancelButtonText: '',
  cancelButtonColor: null,
  confirmButtonText: '',
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
}

Dialog.alert = Dialog

Dialog.confirm = options =>
  Dialog({
    showCancelButton: true,
    ...options
  })

Dialog.close = () => {
  if (instance) {
    instance.toggle(false)
  }
}

Dialog.setDefaultOptions = options => {
  Object.assign(Dialog.currentOptions, options)
}

Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = { ...Dialog.defaultOptions }
}

Dialog.resetDefaultOptions()

Dialog.install = app => {
  app.component(MyDialog)
  app.config.globalProperties.$dialog = Dialog
}

Dialog.Component = MyDialog

export default Dialog
