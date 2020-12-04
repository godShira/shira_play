<template lang="pug">
.overlay(v-if='show && overlay')
.popup-content(:class='cptPopupClass' v-show='show')
  slot
</template>

<script>
import { computed } from 'vue'
import props from './props'
import { name } from './config'

export default {
  name,
  props,
  setup(props) {
    const cptPopupClass = computed(() => {
      const positionClass = [name, props.position].join('-')
      const roundClass = props.round ? [name, 'round'].join('-') : ''
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
