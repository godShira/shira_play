<template lang="pug">
h1 home
my-button.mt-22.mr-18(text="转入资金")
my-button.mt-22.ml-22(text="我在其他券商资产满足" type="primary")
my-button.my-22.mx-22(text="返回" type="primary" size="large")
my-button.my-22.mx-22(size="large") 我在其他券商资产满足
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'home',
  setup(props, context) {
    const { ctx } = getCurrentInstance()
    ctx
      .$dialog({
        title: '温馨提示1111',
        content: '显示错误显示错误',
        showCancelButton: true
      })
      .then(res => {
        if (res) {
          ctx.$dialog.close()
          ctx.$toast('已取消本次预约222')
        }
      })
    return {
      isShow: true
    }
  }
}
</script>
