<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommendInfo"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/business/goods/GoodsList'
import { getDetailDataList, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
import { itemListenerMixin } from 'common/mixin'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommendInfo: [],
    }
  },
  created () {
    this.iid = this.$route.params.iid
    getDetailDataList(this.iid).then(res => {
       // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages
       // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
       // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list
      }
    })
    // 7.请求推荐数据
    getRecommend().then(res => {
      this.recommendInfo = res.data.list
    })
  },
  destroyed () {
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  },
}
</script>

<style scoped>
 #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>