<template lang="pug">
my-picker(
    @select="handleSelect(arguments)"
    :list="linkageData"
    :selected-index="selectedIndex"
    ref="picker"
    :title="title"
    :shadow="shadow"
    @cancel="dataList(selectedIndex[0])"
    @change="handleChange"
    :cancelTxt="cancelTxt"
    :confirmTxt="confirmTxt"
)
</template>

<script>
import { OPTION_SETTING } from './config'
export default {
  ...OPTION_SETTING,
  data() {
    return {
      tempIndex: [0, 0],
      linkageData: []
    }
  },
  mounted() {
    this.dataList(this.selectedIndex[0])
  },
  computed: {},
  watch: {
    linkageData() {
      this.$refs.picker.refresh()
    },
    selectedIndex() {
      this.$refs.picker.setSelectedIndex([0, 0])
      this.dataList(0)
    }
  },
  methods: {
    dataList(index) {
      console.log(index)
      if (index === 0) {
        this.tempIndex = [0, 0]
      }
      const childList = [this.data[index].children][0]
      this.linkageData = [this.data, childList]
    },
    show() {
      this.$refs.picker.setData(this.linkageData)
      this.$refs.picker.show()
    },
    handleSelect(args) {
      this.$emit('select', ...args)
    },
    handleChange(i, newIndex) {
      if (newIndex !== this.tempIndex[i]) {
        for (let j = 1; j > i; j--) {
          this.tempIndex.splice(j, 1)
          this.$refs.picker.scrollTo(j, 0)
        }
        this.tempIndex.splice(i, 1, newIndex)
        if (i === 0) {
          this.dataList(newIndex)
        }
      }
    }
  }
}
</script>
