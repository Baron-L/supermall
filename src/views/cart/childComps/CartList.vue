<template>
  <div class="cart_list">
    <scroll ref="scroll" class="content">
        <cart-list-item
          v-for="(item, index) in cartList"
          :key="index"
          :item-info="item"
          ref="item"
        ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartListItem from "./CartListItem"
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    CartListItem,
    Scroll
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.content {
  height: 100%;
  overflow: hidden;
}
.cart_list {
   height: calc(100% - 44px - 49px - 40px);
}
</style>
