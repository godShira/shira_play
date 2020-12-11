<template lang="pug">
Popup(position='bottom' round :show='show' v-bind='$attrs' @update:show='closePopup')
  .action-sheet
    .action-sheet-head
      .action-sheet-cancel(@click='onCancel' ) {{cancelText}}
      .action-sheet-title {{title || ''}}
      .action-sheet-confirm(@click='onConfirm') {{isConfirmShow?confirmText:''}}
    .action-sheet-content
      slot
</template>
<script>
import { ref } from 'vue'
import { OPTION_SETTING } from './config'
export default {
  ...OPTION_SETTING,
  emits: ['confirm', 'cancel', 'update:show'],
  setup(_, context) {
    return useMethod(context.emit)
  }
}
const useMethod = emit => {
  const closePopup = () => emit('update:show', false)
  const onCancel = () => {
    closePopup()
    emit('cancel')
  }
  const onConfirm = () => {
    // closePopup()
    emit('confirm', closePopup)
  }

  return { onCancel, onConfirm, closePopup }
}
</script>
<style lang="scss">
@import './action-sheet';
</style>
