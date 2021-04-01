<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1,
    },
    /**
     * 是否派发click事件
     */
    click: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pullDownLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // scroll: null,
    };
  },
  mounted() {
    this.initScroll();
  },
  methods: {
    initScroll() {
      // bs初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        pullDownLoad: this.pullDownLoad,
      });

      /**
       * Note
       * 这种方法应该不用监听每张图片加载完成时进行refresh，而是直接在开始滚动前进行刷新
       * 这样做能减少监听次数，否则每一张图片加载完都会刷新，应该会影响性能
       * 但还是先按照coderwhy老师的先写
       */
      // this.scroll.on("beforeScrollStart", () => {
      //   console.log('---');
      //   this.refresh();
      // });

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on("scroll", (pos) => {
          this.$emit("scroll", pos);
        });
      }

      // 是否上拉加载
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit('pullingUp');
          this.scroll.finishPullUp();
        });
      }
    },

    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    refresh() {
      // 等scroll加载完成
      this.scroll && this.scroll.refresh();
    }
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
