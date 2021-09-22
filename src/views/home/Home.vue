<template>
  <div>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <scroll class="content">
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend :recommends="recommends"></home-recommend>
        <feature-view></feature-view>
        <tab-control :titles="titles" class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
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

import { getHomeDataList, getHomeGoodsList } from 'network/home'

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
  },
  created () {
    this.getHomeDataList()
    this.getHomeGoodsList('pop')
    this.getHomeGoodsList('new')
    this.getHomeGoodsList('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
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
    }
  }
}
</script>

<style scoped>
  #home {
   /* padding-top: 44px;  */
   height: 100vh;
   position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    top:0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>