<template lang="pug">
h1 home
my-button(text="转入资金")
my-button(text="我在其他券商资产满足" type="primary")
.txt-center
  my-button(text="返回" type="primary" size="large")
.txt-center
  my-button(text="我在其他券商资产满足" size="large")
</template>

<script>
export default {
  name: 'home',
  setup() {
    return {
      isShow: true
    }
  }
}
</script>
