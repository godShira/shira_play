<template lang="pug">
.branch-search.txt-bold.px-16.py-16.fixed(@click="$emit('click')")
  input.block.txt-h4.txt-center.txt-info(type='text' readonly value="搜索")
  img.search-icon.block(:src='require("./search.png")' alt='搜索图标')
</template>
<script>
export default {
  name: 'branch-search'
}
</script>
<style lang="scss">
.branch-search {
  z-index: 99;
  left: 0;
  right: 0;
  background: #ffffff;
  input {
    text-indent: 20px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    background: #eee;
    padding: 12px 0;
  }
  .search-icon {
    position: absolute;
    width: 24px;
    left: 30px;
    top: 26px;
  }
}
</style>
