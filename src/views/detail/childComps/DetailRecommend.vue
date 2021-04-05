<template>
  <goods-list :goods="recommends"/>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList';

export default {
  components: {
    GoodsList,
  },
  props: {
    recommends: {
      type: Array,
      defalut() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>