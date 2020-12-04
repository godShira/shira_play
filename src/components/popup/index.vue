<template lang="pug">
.overlay(v-if='show && overlay' @click='onCancel')
.popup-content(:class='cptPopupClass' v-show='show')
  slot
</template>

<script>
import { computed } from 'vue'
import { ROUND_PROPS, POSITION_PROPS, CLOSE_OVERLAY_PROP } from './props'
import { OPTION_SETTING, name } from './config'

const CORSS_BAR = '-'

export default {
  ...OPTION_SETTING,
  setup(props, context) {
    const cptPopupClass = computed(() => {
      const positionClass = [name, props[POSITION_PROPS]].join(CORSS_BAR)
      const roundClass = props[ROUND_PROPS] ? [name, ROUND_PROPS].join(CORSS_BAR) : ''
      return [positionClass, roundClass]
    })
    const onCancel = () => {
      if (props[CLOSE_OVERLAY_PROP]) {
        context.emit('update:show', false)
      }
    }
    return {
      cptPopupClass,
      onCancel
    }
  }
}
</script>

<style lang="scss">
@import './popup';
</style>
