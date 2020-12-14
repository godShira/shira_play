export default {
  list: {
    type: Array,
    default() {
      return []
    }
  },
  title: {
    type: String
  },
  shadow: {
    type: Boolean,
    default: false
  },
  alias: {
    // name,num的别名
    type: Object,
    default() {
      return {}
    }
  },
  cancelTxt: {
    type: String,
    default: '取消'
  },
  confirmTxt: {
    type: String,
    default: '确定'
  },
  selectedIndex: {
    type: Array,
    default() {
      return [0]
    }
  },
  value: {
    type: Boolean,
    default: false
  }
}
