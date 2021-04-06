<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" @click="titleClick(index)" :class="{ active: index === currentIndex }">
          {{ item }}
        </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index);
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.back img {
  vertical-align: middle;
}

.active {
  color: #4aa317;
}
</style>