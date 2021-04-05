<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages" />
    <detail-goods-info :goodsInfo="goodsInfo"/>
    <detail-shop-info :shopInfo="shopInfo"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailShopInfo from './childComps/DetailShopInfo';

import { getDetailData, GoodsInfo, ShopInfo } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo
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
/* .detail {
  overflow: hidden;
} */
</style>