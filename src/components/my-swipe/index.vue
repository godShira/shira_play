<template lang="pug">
.my-swipe.hidden.relative
  .swiper.flex(@touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd")
    slot
  slot(name="indicator")
    .indicator.flex-center.absolute.full-w(v-if="showIndicator && slideCount > 1")
      .indicator-item(v-for="(item, index) in slideCount" :class="{ active: index === currentIndex - 1 }" :key="index")
</template>

<script>
import props from './props'
export default {
  name: 'my-swipe',
  props,
  data: function() {
    return {
      slideCount: 0,
      totalWidth: 0,
      swipeStyle: {},
      currentIndex: 1,
      scrolling: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.handleDom()
      if (this.auto) this.startTimer()
    }, 100)
  },
  methods: {
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTimer() {
      window.clearInterval(this.playTimer)
    },
    scrollContent(currentPosition) {
      this.scrolling = true
      this.swipeStyle.transition = 'transform ' + this.animDuration + 'ms'
      this.setTransform(currentPosition)
      this.checkPosition()
      this.scrolling = false
    },
    checkPosition() {
      setTimeout(() => {
        this.swipeStyle.transition = '0ms'
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }
        this.$emit('transitionend', this.currentIndex - 1)
      }, this.animDuration)
    },
    setTransform(position) {
      this.swipeStyle.transform = `translate3d(${position}px, 0, 0)`
      this.swipeStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`
      this.swipeStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`
    },
    handleDom() {
      let swiperEl = document.querySelector('.swiper')
      let slidesEls = swiperEl.getElementsByClassName('slide')
      this.slideCount = slidesEls.length
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, slidesEls[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swipeStyle = swiperEl.style
      }
      this.setTransform(-this.totalWidth)
    },
    touchStart(e) {
      if (this.scrolling) return
      this.stopTimer()
      this.startX = e.touches[0].pageX
      this.distance = 0
    },
    touchMove(e) {
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      let currentPosition = -this.currentIndex * this.totalWidth
      let moveDistance = this.distance + currentPosition
      this.setTransform(moveDistance)
    },
    touchEnd() {
      let currentMove = Math.abs(this.distance)
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex++
      }
      this.scrollContent(-this.currentIndex * this.totalWidth)
      if (this.auto) this.startTimer()
    },
    previous() {
      this.changeItem(-1)
    },
    next() {
      this.changeItem(1)
    },
    changeItem(num) {
      this.stopTimer()
      this.currentIndex += num
      this.scrollContent(-this.currentIndex * this.totalWidth)
      if (this.auto) this.startTimer()
    }
  }
}
</script>
<style lang="scss">
@import './my-swipe';
</style>
