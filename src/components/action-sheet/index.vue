<template lang="pug">
Popup(position='bottom' round :show='show' @update:show='closePopup')
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

const useMethod = emit => {
  const closePopup = () => emit('update:show', false)
  const onCancel = () => {
    closePopup()
    console.log('cancel')
    emit('cancel')
  }
  const onConfirm = () => {
    closePopup()
    console.log('confirm')
    emit('confirm')
  }

  return { onCancel, onConfirm, closePopup }
}

export default {
  ...OPTION_SETTING,
  setup(_, context) {
    return useMethod(context.emit)
  }
}
</script>
<style lang="scss">
@import './action-sheet';
</style>
