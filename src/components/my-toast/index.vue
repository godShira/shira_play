<template lang="pug">
.my-toast(v-show='show'  :class='`toast-${position}`')
  .toast-cnt
    .msg {{ message }}
    .mask

</template>
<script>
import { watch, onMounted, onUnmounted } from 'vue'
import props from './props'
import { name } from './config'
export default {
  name,
  props,
  emits: ['update:show'],

  setup(props, { emit }) {
    let timer
    let clickable = false
    const toggleClickable = () => {
      const newValue = props.show && props.forbidClick
      if (clickable !== newValue) {
        clickable = newValue
      }
    }
    const clearTimer = () => {
      clearTimeout(timer)
    }
    watch([() => props.show, () => props.forbidClick], toggleClickable)
    watch([() => props.show, () => props.duration], () => {
      clearTimer()
      if (props.show && props.duration > 0) {
        timer = setTimeout(() => {
          emit('update:show', false)
        }, props.duration)
      }
    })
    onMounted(toggleClickable)
    onUnmounted(toggleClickable)
    return {}
  }
}
</script>
<style lang="scss">
.overlay-all {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.txt-center {
  text-align: center;
}
.flex-1 {
  flex: 1;
}
.border-t {
  border-top: 1px solid #eee;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-toast {
  position: fixed;
  z-index: 2030;
  @extend .overlay-all;
  .mask {
    position: absolute;
    z-index: 2030;
    @extend .overlay-all;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .toast-cnt {
    position: absolute;
    z-index: 2030;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 8px;
    padding: 14px 16px;
    .msg {
      position: relative;
      color: #ffffff;
      z-index: 2031;
    }
  }
}
</style>
