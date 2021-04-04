<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages" />
    <detail-goods-info :goodsInfo="goodsInfo"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailGoodsInfo from './childComps/DetailGoodsInfo';

import { getDetailData, goodsInfo } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
  },
  data() {
    return {
      iid: null,
      topImages: null,
      goodsInfo: {},
    }
  },
  created() {
    this._initDetail()
  },

  methods: {
    _initDetail() {
      this.iid = this.$route.query.iid

      getDetailData(this.iid).then(res => {
        // 1.获取数据
        const data = res.result;
        console.log(data);

        // 2.轮播图数据
        this.topImages = res.result.itemInfo.topImages;

        // 3.商品基本信息
        this.goodsInfo = new goodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
        
      })
    }
  }
}
</script>

<style scoped>
/* .detail {
  overflow: hidden;
} */
</style>