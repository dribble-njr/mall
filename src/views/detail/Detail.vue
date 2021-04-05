<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="wrapper">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shopInfo="shopInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';

import Scroll from 'components/common/scroll/Scroll'

import { getDetailData, GoodsInfo, ShopInfo } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,

    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: null,
      goodsInfo: {},
      shopInfo: {},
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
        this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
        
        // 4.店铺基本信息
        this.shopInfo = new ShopInfo(data.shopInfo);
      })
    }
  }
}
</script>

<style scoped>
#detail {
  /* overflow: hidden; */
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.wrapper {
  height: calc(100% - 44px);
}
</style>