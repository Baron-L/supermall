<template>
<div class="checkbutton" :class="{active:isChecked}">
  <img src="~/assets/img/cart/tick.svg" alt="">
</div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.checkbutton{
  border-radius: 50%;
  border:solid 2px #aaa;
}
.active{
  border-color: #ff5777;
  border-radius: 50%;
  background-color: #ff5777;
}
</style>
