<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="contentScroll" :listenScroll="true">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shopInfo="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comments" :commentInfo="commentInfo"/>
      <detail-recommend ref="recommends" :recommends="recommends"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart"/>
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
import DetailRecommend from './childComps/DetailRecommend';
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from 'components/common/scroll/Scroll'

import { getDetailData, GoodsInfo, ShopInfo, GoodsParam, getRecommend } from 'network/detail';

import { backTopMixin } from "@/common/mixin"
import { debounce } from '@/common/utils';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommend,
    DetailBottomBar,

    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: null,
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [], //记录内容的offsetTop
      getThemeTopY: null, // 防抖函数
      currentIndex: 0, // 联动
    }
  },
  created() {
    this._initDetail()
  },
  mounted() {
    const iid = this.$route.query.iid;
    this.$bus.$on('detailItemImageLoad' + iid, () => {
      this.$refs.scroll.refresh();
    })
  },
  methods: {
    _initDetail() {
      this.iid = this.$route.query.iid

      getDetailData(this.iid).then(res => {
        // 1.获取数据
        const data = res.result;

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
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      })
      this.getThemeTopY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.comments.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop - 44);
        this.themeTopY.push(Infinity)
      }, 200)
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index])
    },
    contentScroll(pos) {
      let posY = -pos.y;
      const len = this.themeTopY.length;

      for (let i = 0; i < len - 1; i++) {
        if (this.currentIndex !== i && posY >= this.themeTopY[i] && posY < this.themeTopY[i+1]) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      this.isShowBackTop = -pos.y > 1000;
    },
    addToCart() {
      const product = {};
      // 1.获取购物车所需信息
      product.iid = this.iid;
      product.img = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.newPrice = this.goodsInfo.realPrice;
      console.log(product);

      // 2.将商品添加到购物车里
      this.$store.dispatch('addToCart', product)
    }
  }
}
</script>

<style scoped>
#detail {
  overflow: hidden;
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.wrapper {
  height: calc(100% - 44px - 49px);
}
</style>
