<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }
}
</script>

<style>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check-button img {
    display: inline-block;
  }
  .check {
    background-color: var(--color-high-text);
    border: 2px solid var(--color-high-text);
  }
</style>