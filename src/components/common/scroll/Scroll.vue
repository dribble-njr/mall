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
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
      });

      this.scroll.on("beforeScrollStart", () => {
        this.scroll.refresh();
      });
    },

    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
