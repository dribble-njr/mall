<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="right" @click="cartBuy">
      去结算({{totalCount}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex"

export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    ...mapGetters(['totalPrice', 'totalCount', 'cartList']),
    isSelectAll () {
      if (this.cartList.length === 0) return false
      return this.cartList.every(item => item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { // 部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    cartBuy() {
      this.$emit("cartBuy")
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}

.check-content {
  height: 20px;
  display: flex;
  width: 80px;
}

.check-content span {
  padding-left: 40px;
}

.check-button {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 10px;
  height: 20px;
  width: 20px;
}

.price {
  flex: 1;
}

.right {
  text-align: center;
  background-color: var(--color-high-text);
  width: 100px;
  color: #fff;
}
</style>
