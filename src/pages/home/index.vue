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
import { getCurrentInstance } from 'vue'

export default {
  name: 'home',
  setup(props, context) {
    const { ctx } = getCurrentInstance()
    ctx.$toast('已取消本次预约222')
    /*ctx
      .$dialog({
        title: '温馨提示1111',
        content: '显示错误显示错误',
        showCancelButton: true
      })
      .then(res => {
        if (res) ctx.$dialog.close()
      })*/
    return {
      isShow: true
    }
  }
}
</script>
