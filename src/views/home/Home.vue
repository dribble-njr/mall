<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      :listenScroll="true"
      @scroll="handleScroll"
      :pullUpLoad="true"
      @pullingUp="handlePullUp"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="changeTab"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RcommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backtop/BackTop";

import { getHomeMultiData, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultiData();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    /**
     * Note 
     * 监听图片加载完成，再调用refresh重新刷新
     * 先暂定用这种方法
     * 不应放在created中，因为那时可能还没加载完dom
     */
    this.$bus.$on('itemImageLoad', () => {
      // console.log('------');
      this.$refs.scroll.refresh();
    })
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;

      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },

    /**
     * 事件监听相关方法
     */
    changeTab(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    handleScroll(pos) {
      this.isShowBackTop = -pos.y > 1000;
    },

    handlePullUp() {
      this.getHomeGoods(this.currentType)
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  overflow: hidden;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.tab-control {
  /* 吸顶效果 */
  position: sticky;
  top: 40px;
  z-index: 9;
}

.wrapper {
  height: calc(100% - 93px);
  margin-top: 44px;
}

/* 方法二 */
/* #home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} */
</style>
