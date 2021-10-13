<template>
  <div>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control 
        :titles="titles" 
        @tabClick="tabClick" 
        ref="tabControl1"
        class="tab-control" v-show="isTabFixed"
      />
      <scroll class="content"
              ref="scroll" 
              :probe-type="3" 
              @scroll="scrollClick" 
              :pull-up-load="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend :recommends="recommends"></home-recommend>
        <feature-view></feature-view>
        <tab-control 
          :titles="titles" 
          @tabClick="tabClick" 
          ref="tabControl2"
        >
        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <!-- 组件之间无法监听点击事件，想要监听需添加native原生事件 -->
      <back-top @click.native="backClick" v-show="isShow"></back-top>
    </div>
  </div>
</template>

<script>
import HomeSwiper from './homeChild/HomeSwiper'
import HomeRecommend from './homeChild/HomeRecommend'
import FeatureView from './homeChild/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/business/tabControl/TabControl'
import GoodsList from 'components/business/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/business/backTop/BackTop'
import { getHomeDataList, getHomeGoodsList } from 'network/home'
import { debounce } from 'common/utils'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created () {
    this.getHomeDataList()
    this.getHomeGoodsList('pop')
    this.getHomeGoodsList('new')
    this.getHomeGoodsList('sell')
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
     // 获取数据
    getHomeDataList () {
      getHomeDataList().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list;
      })
    },
    // 获取商品数据
    getHomeGoodsList(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsList(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      })
    },
    // 子组件传递
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick () {
     this.$refs.scroll.scrollTo(0, 0)
    },
    scrollClick(position) {
      this.isShow = (-position.y) > 1000
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoodsList(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  data () {
    return {
      banners: [],
      recommends: [],
      titles: [{id: 1,type: '流行'},{id: 2,type: '新款'},{id: 3,type: '精选'},],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  }
}
</script>

<style scoped>
  #home {
   height: 100vh;
   position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    top:0;
    right: 0;
    z-index: 9; */
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
   .tab-control {
    position: relative;
    z-index: 9;
  }
</style>