<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="wrapper" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shopInfo="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';

import Scroll from 'components/common/scroll/Scroll'

import { getDetailData, GoodsInfo, ShopInfo, GoodsParam } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,

    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: null,
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
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

        // 5.商品信息
        this.detailInfo = data.detailInfo;

        // 6.获取参数的信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 7.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    imageLoad() {
      this.$refs.scroll.refresh();
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