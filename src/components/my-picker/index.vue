<template lang="pug">
transition(name="picker-fade")
  .my-picker.fixed.full.hidden.txt-center(:class="{ shadow: shadow }" v-show="state === 1" @touchmove.prevent @click="onCancel")
    transition(name="picker-move")
      .picker-panel(v-show="state === 1" @click.stop)
        .my-picker-head.space-between.txt-info
          .my-picker-cancel(@click='onCancel' ) {{cancelTxt}}
          .my-picker-title.txt-h3.txt-bold.txt-default {{title || ''}}
          .my-picker-confirm(@click='onConfirm') {{confirmTxt}}
        .picker-content
          .mask-top
          .mask-bottom
          .wheel-wrapper(ref="wheelWrapper")
            .wheel(v-for="(parent, i) in pickerData" :key="i")
              ul.wheel-scroll
                li.wheel-item(v-for="(item, index) in parent" :key="index") {{ item[alias.name] || item.name }}
</template>

<script>
import BScroll from 'better-scroll'
import { OPTION_SETTING } from './config'

const STATE_HIDE = 0
const STATE_SHOW = 1

const EVENT_SELECT = 'select'
const EVENT_VALUE_CHANGE = 'valuechange'
const EVENT_CANCEL = 'cancel'
const EVENT_CHANGE = 'change'

export default {
  ...OPTION_SETTING,
  data() {
    return {
      state: STATE_HIDE,
      pickerData: [this.list.slice()],
      pickerSelectedIndex: this.selectedIndex,
      pickerSelectedVal: [],
      pickerSelectedText: []
    }
  },
  created() {
    if (!this.pickerSelectedIndex.length) {
      this.pickerSelectedIndex = []
      for (let i = 0; i < this.pickerData.length; i++) {
        this.pickerSelectedIndex[i] = 0
      }
    }
  },
  methods: {
    onConfirm() {
      if (!this._canConfirm()) {
        return
      }
      this.hide()

      let changed = false
      for (let i = 0; i < this.pickerData.length; i++) {
        let index = this.wheels[i].getSelectedIndex()
        this.pickerSelectedIndex[i] = index

        let value = null
        if (this.pickerData[i][Object.keys(this.pickerData[i])[index]]) {
          value = this.pickerData[i][Object.keys(this.pickerData[i])[index]].id || this.pickerData[i][index].displayId
        }
        if (this.pickerSelectedVal[i] !== value) {
          changed = true
        }
        this.pickerSelectedText[i] = this.pickerData[i][Object.keys(this.pickerData[i])[index]]
      }

      this.$emit(EVENT_SELECT, this.pickerSelectedIndex, this.pickerSelectedText)

      if (changed) {
        this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedIndex, this.pickerSelectedText)
      }
    },
    onCancel() {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },
    show() {
      if (this.state === STATE_SHOW) {
        return
      }
      this.state = STATE_SHOW

      if (!this.wheels || this.dirty) {
        this.$nextTick(() => {
          this.wheels = []
          let wheelWrapper = this.$refs.wheelWrapper
          for (let i = 0; i < this.pickerData.length; i++) {
            this._createWheel(wheelWrapper, i)
          }
          this.dirty = false
        })
      } else {
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].enable()
          this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
        }
      }
    },
    hide() {
      this.state = STATE_HIDE

      for (let i = 0; i < this.pickerData.length; i++) {
        this.wheels[i].disable()
      }
    },
    setData(data) {
      this.pickerData = data.slice()
      this.dirty = true
    },
    setSelectedIndex(index) {
      this.pickerSelectedIndex = index
    },
    refill(datas) {
      let ret = []
      if (!datas.length) {
        return ret
      }
      datas.forEach((data, index) => {
        ret[index] = this.refillColumn(index, data)
      })
      return ret
    },
    refillColumn(index, data) {
      if (this.state !== STATE_SHOW) {
        console.error('can not use refillColumn when picker is not show')
        return
      }
      const wheelWrapper = this.$refs.wheelWrapper
      let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
      let wheel = this.wheels[index]
      if (scroll && wheel) {
        let oldData = this.pickerData[index]
        this.$set(this.pickerData, index, data)
        let selectedIndex = wheel.getSelectedIndex()
        let dist = 0
        if (oldData.length) {
          let oldValue = oldData[selectedIndex].value
          for (let i = 0; i < data.length; i++) {
            if (data[i].value === oldValue) {
              dist = i
              break
            }
          }
        }
        this.pickerSelectedIndex[index] = dist
        this.$nextTick(() => {
          // recreate wheel so that the wrapperHeight will be correct.
          wheel = this._createWheel(wheelWrapper, index)
          wheel.wheelTo(dist)
        })
        return dist
      }
    },
    scrollTo(index, dist) {
      const wheel = this.wheels[index]
      this.pickerSelectedIndex[index] = dist
      wheel.wheelTo(dist)
    },
    refresh() {
      this.$nextTick(() => {
        if (this.wheels) {
          this.wheels.forEach(wheel => {
            wheel.refresh()
          })
        }
      })
    },
    _createWheel(wheelWrapper, i) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wheelWrapper.children[i], {
          wheel: {
            selectedIndex: this.pickerSelectedIndex[i],
            /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item'
          },
          probeType: 3
        })

        this.wheels[i].on('scrollEnd', () => {
          this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
        })
      } else {
        this.wheels[i].refresh()
      }

      return this.wheels[i]
    },
    _canConfirm() {
      return this.wheels.every(wheel => {
        return !wheel.isInTransition
      })
    }
  },
  watch: {
    list(newData) {
      this.setData(newData)
    },
    selectedIndex(value) {
      this.pickerSelectedIndex = value
    }
  }
}
</script>

<style lang="scss">
@import './my-picker';
</style>
