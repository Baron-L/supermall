<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar class="bottom"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength',
    ])
  },
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-nav{
  background-color: var(--color-tint);
  color: #fff;
}
/* .bottom{
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
} */
</style>