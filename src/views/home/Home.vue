<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="changeTab"
      ref="tabControl1"
      v-show="isTabFixed"
    /> 

    <scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      :listenScroll="true"
      @scroll="handleScroll"
      :pullUpLoad="true"
      @pullingUp="handlePullUp"
    >
      <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="changeTab"
        ref="tabControl2"
        v-show="!isTabFixed"
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
      tabOffsetTop: 0,
      isTabFixed: false,
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
  // 回到定位位置
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  // 记录离开首页此时的高度
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  mounted() {
    /**
     * Note 
     * 监听图片加载完成，再调用refresh重新刷新
     * 先暂定用这种方法
     * 不应放在created中，因为那时可能还没加载完dom
     */
    // this.$bus.$on('itemImageLoad', () => {
    //   this.$refs.scroll.refresh();
    // })
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    handleScroll(pos) {
      this.isShowBackTop = -pos.y > 1000;

      this.isTabFixed = -pos.y > this.tabOffsetTop - 44
    },

    handlePullUp() {
      this.getHomeGoods(this.currentType)
    },

    swipperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /* 在浏览器原生滚动时， */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1; */
}

.wrapper {
  height: calc(100% - 93px);
}

/* 滚动方法二 */
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
