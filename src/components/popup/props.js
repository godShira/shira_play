export const POSITION_PROPS = 'position'
export const ROUND_PROPS = 'round'

export default {
  show: Boolean,
  overlay: {
    type: Boolean,
    default: true
  },
  [POSITION_PROPS]: {
    type: String,
    default: 'center'
  },
  [ROUND_PROPS]: Boolean
}
