<template>
  <scroll class="wrapper" ref="scroll">
    <cart-list-item v-for="(item, index) in list" :key="index" :product="item"/>
  </scroll>
</template>

<script>
import { mapGetters } from 'vuex';

import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem';

export default {
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters({
      list: 'cartList'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
/* .cart-list {
  height: 100%;
} */

.wrapper {
  height: calc(100% - 44px - 49px - 40px);
}
</style>