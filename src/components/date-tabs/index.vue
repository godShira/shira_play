<template lang="pug">
.date-tabs.box-shadow
  .flex.tabs
    .tab.tx-ccenter.txt-h5.py-15.flex-1(v-for='(item,index) in tabs' :class='{"tab-active": index===activeIndex }' @click='onTabClick(index)') {{item}}
  .date-wrap(v-if='!activeIndex')
    .flex-y.flex-center(v-for='(item,index) in dateList' :class='{"date-active": index===selectedDate}' @click='onDateClick(index)')
      .txt-mute.mb-6.txt-h5 今天
      .txt-bold.mb-13.txt-h4 12-09
      .cirlce
  .txt-default.py-83.txt-center.txt-h5(v-else) 不指定日期
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: 'date-tabs',
  props: ['tabs', 'activeIndex'],
  setup() {
    return {
      ...useTabs(),
      ...useDate()
    }
  }
}

const useTabs = () => {
  const active = ref(0)
  const onTabClick = index => (activeIndex.value = index)
  return { active, onTabClick }
}

const useDate = () => {
  const selectedDate = ref()
  let dateList = reactive([])
  const Date_ITEM = { label: '今天', date: '12-09' }
  const getDateList = () => (dateList = new Array(10).fill('').map(() => Date_ITEM))
  getDateList()
  const onDateClick = index => (selectedDate.value = index)
  return { onDateClick, selectedDate, dateList }
}
</script>

<style lang="scss">
.date-tabs {
  .circle {
    border: 1px solid #999;
    width: 16px;
    height: 16px;
    border-radius: 18px;
  }
  .date-active {
    .circle {
      width: 18px;
      height: 18px;
      border: none;
      background: url('../../assets/img/circle-success.png') no-repeat;
      background-size: 105% 100%;
    }
  }
  .date-wrap {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 18px;
    & > div {
      flex: 20%;
      margin-top: 18px;
      position: relative;
      &::after {
        position: absolute;
        right: 0;
        width: 1px;
        height: 36px;
        background: #eee;
        display: inline-block;
        content: '';
      }
      &:nth-child(5n)::after {
        display: none;
      }
    }
  }
  .tabs {
    .tab {
      color: #666;
      background: #f3f3f3;
    }
    .tab-active {
      color: #333;
      font-weight: bold;
      background: #fff;
    }
  }
}
</style>
