<template lang="pug">
.overlay(v-if='show && overlay')
.popup-content(:class='cptPopupClass' v-show='show')
  slot
</template>

<script>
import { computed } from 'vue'
import props, { ROUND_PROPS, POSITION_PROPS } from './props'
import { name } from './config'

const CORSS_BAR = '-'

export default {
  name,
  props,
  setup(props) {
    const cptPopupClass = computed(() => {
      const positionClass = [name, props[POSITION_PROPS]].join(CORSS_BAR)
      const roundClass = props[ROUND_PROPS] ? [name, ROUND_PROPS].join(CORSS_BAR) : ''
      return [positionClass, roundClass]
    })
    return {
      cptPopupClass
    }
  }
}
</script>

<style lang="scss">
@import './popup';
</style>
