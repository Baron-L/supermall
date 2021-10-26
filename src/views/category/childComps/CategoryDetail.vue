<template>
<grid-view>
  <goods-list-item  v-for="(item,index) in categoryData" :goods-item="item" :key="index"></goods-list-item>
</grid-view>
</template>

<script>
import GoodsListItem from "components/business/goods/GoodsListItem";
import GridView from "components/common/gridView/GridView";
export default {
  name: "CategoryDetail",
  props: {
    categoryData: {
      type: Array
    }
  },
  components: {
    GoodsListItem,
    GridView
  }
}
</script>

<style scoped>

</style>
