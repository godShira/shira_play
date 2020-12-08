<template lang="pug">
.my-dialog(v-if='show')
  .mask
  .dialog-cnt.txt-center
    .dialog-cnt-hd(v-show='!!title')
      strong {{title}}
    .dialog-cnt-bd(v-html='content')
    .dialog-cnt-ft
      .flex-center.border-t
        .btn.cancel.flex-1(v-if='showCancelButton' @click="$emit('update:show', false)") {{cancelText}}
        .btn.comfirm.flex-1(v-if='showConfirmButton' @click="callback('confirm')") {{confirmText}}
</template>
<script>
import props from './props'
import { name } from './config'
export default {
  name,
  props
}
</script>
<style lang="scss">
@import './my-dialog';
</style>
