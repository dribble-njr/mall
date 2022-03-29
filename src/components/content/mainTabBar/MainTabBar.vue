<template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>
