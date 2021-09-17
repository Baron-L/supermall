<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.iid" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem   from './GoodsListItem'
export default {
  components: { GoodsListItem },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
  },
}
</script>

<style>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>