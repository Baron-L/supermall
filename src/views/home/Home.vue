<template>
  <div>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <home-swiper :banners="banners"></home-swiper>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './homeChild/HomeSwiper'
import { getHomeDataList } from 'network/home'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
  },
  created () {
    // 获取数据
    getHomeDataList().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list;
    })
  },
  data () {
    return {
      banners: [],
      recommends: []
    }
  }
}
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>