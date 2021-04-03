<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import { getDetailData } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      topImages: null
    }
  },
  created() {
    this.iid = this.$route.query.iid

    getDetailData(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
    })
  }
}
</script>

<style scoped>
/* .detail {
  overflow: hidden;
} */
</style>