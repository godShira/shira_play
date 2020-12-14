<template lang="pug">
.branch-city-line.flex-center(@click="$emit('click')")
  .label.txt-h4 城市
  .selectedCity.flex-1.txt-h3(:class="{ noData: !`${selectedCityTxt}` }") {{selectedCityTxt?selectedCityTxt:'请选择城市'}}
  img.arrow_right(:src="require('./arrow-right.png')")

</template>
<script>
export default {
  name: 'branch-city-line',
  props: ['selectedCityTxt']
}
</script>
<style lang="scss">
.branch-city-line {
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  padding: 20px 20px;
  .label {
    width: 100px;
  }
  .selectedCity {
    color: #333333;
    &.noData {
      color: #999999;
    }
  }
  .arrow_right {
    width: 24px;
  }
}
</style>
