export default {
  icon: String,
  show: Boolean,
  message: [Number, String],
  duration: Number,
  className: null,
  iconPrefix: String,
  lockScroll: Boolean,
  loadingType: String,
  forbidClick: Boolean,
  closeOnClick: Boolean,
  type: {
    type: String,
    default: 'text'
  },
  position: {
    type: String,
    default: 'middle'
  }
}
