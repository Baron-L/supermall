<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendInfo"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
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
import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/business/goods/GoodsList'
import { getDetailDataList, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
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
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
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

    this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)
    }, 100)
  },
  destroyed () {
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      this.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
    },
    detailScroll(position) {
      const positionY = -position.y
      let length = this.themeTopY.length
      for (let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShow = (-position.y) > 1000
    },
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
    height: calc(100% - 44px - 49px);
  }
</style>