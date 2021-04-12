<template>
  <div class="toast" v-show="toastShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  // 普通方式
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  
  // 插件方式封装
  data() {
    return {
      message: '',
      toastShow: false
    }
  },
  methods: {
    show(msg, delay = 1500) {
      this.message = msg;
      this.toastShow = true;

      setTimeout(() => {
        this.toastShow = false;
        this.message = '';
      }, delay);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .75);
  color: #fff;
  border-radius: 15px;
}
</style>