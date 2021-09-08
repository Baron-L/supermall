<template>
  <div id="app">
    <router-view></router-view>
   <common-tab-bar></common-tab-bar>
  </div>
</template>

<script>
import CommonTabBar from 'components/business/commontabbar/CommonTabBar'
export default {
  name: 'App',
  components: {
    CommonTabBar
  }
}
</script>

<style>
@import "assets/css/bass.css";
</style>
