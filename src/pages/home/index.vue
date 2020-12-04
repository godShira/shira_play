<template lang="pug">
h1 home
Popup(:show="true") 我们党发动机公司
</template>

<script>
import Popup from '@/components/popup'

export default {
  name: 'home',
  components: { Popup },
  setup() {
    return {
      isShow: true
    }
  }
}
</script>
