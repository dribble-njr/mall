<template>
  <div id="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'

export default {
  components: {
    DetailNavBar,
  },
  data() {
    return {
      iid: null,
    }
  },
  created() {
    this.iid = this.$route.query.iid
  }
}
</script>

<style scoped>
/* .detail {
  overflow: hidden;
} */
</style>