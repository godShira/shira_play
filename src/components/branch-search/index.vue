<template lang="pug">
.branch-search.txt-bold.px-16.py-16.fixed(@click="$emit('click')")
  input.block.txt-h4.txt-info(type='text' :readonly='readonly' :value='value'
    :placeholder="`${readonly?'搜索':'营业部名称或代码'}`"
    :class="`txt-${readonly?'center':'left'} txt-${readonly?'':'indent'}`")
  img.search-icon.block(:src='require("./search.png")' alt='搜索图标')
</template>
<script>
export default {
  name: 'branch-search',
  props: {
    value: null,
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.branch-search {
  z-index: 99;
  left: 0;
  right: 0;
  background: #ffffff;
  input {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    background: #eee;
    padding: 12px 0;
    color: #333333;
    &.txt-indent {
      text-indent: 45px;
    }
    &::placeholder {
      color: #999999;
    }
  }
  .search-icon {
    position: absolute;
    width: 24px;
    left: 30px;
    top: 26px;
  }
}
</style>
