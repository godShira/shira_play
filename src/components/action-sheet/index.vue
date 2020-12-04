<template lang="pug">
Popup(position='bottom' round :show='show')
</template>
<script>
import { name } from './config'
import props from './props'
import Popup from '../popup'
export default {
  name,
  props,
  setup() {},
  components: { Popup }
}
</script>
