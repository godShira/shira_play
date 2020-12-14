export default {
  data: {
    type: Array,
    default() {
      return []
    }
  },
  alias: {
    // name,num的别名
    type: Object,
    default() {
      return {}
    }
  },
  title: {
    type: String
  },
  selectedIndex: {
    type: Array,
    default() {
      return [0, 0]
    }
  },
  cancelTxt: {
    type: String
  },
  confirmTxt: {
    type: String
  },
  shadow: {
    type: Boolean,
    default: false
  }
}