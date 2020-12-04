export const POSITION_PROPS = 'position'
export const ROUND_PROPS = 'round'
export const CLOSE_OVERLAY_PROP = 'closeOnClickOverlay'

const DEFAULT_TRUE = {
  type: Boolean,
  default: true
}

export default {
  show: Boolean,
  overlay: DEFAULT_TRUE,
  [POSITION_PROPS]: {
    type: String,
    default: 'center'
  },
  [ROUND_PROPS]: Boolean,
  [CLOSE_OVERLAY_PROP]: DEFAULT_TRUE
}
