<template>
  <div id="profile">
     <nav-bar class="profile-nav"><div slot="center">商城</div></nav-bar>
     <user-info></user-info>
     <div class="profile-info">
      <detail-info>
          <div slot="name">0.00  <span style="color:#666666;font-weight: normal;font-size: 15px">元</span></div>
          <div slot="value">我的余额</div>
      </detail-info>
      <detail-info>
          <div slot="name">0 <span style="color:#666666;font-weight: normal;font-size: 15px">个</span> </div>
          <div slot="value">我的优惠</div>
      </detail-info>
      <detail-info>
          <div slot="name">0 <span style="color:#666666;font-weight: normal;font-size: 15px">分</span></div>
          <div slot="value">我的积分</div>
      </detail-info>
     </div>
     <list-view :list-data="orderList"></list-view>
     <list-view :list-data="serviceList"></list-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserInfo from './childComps/UserInfo'
import DetailInfo from './childComps/DetailInfo'
import ListView from './childComps/ListView'
export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    DetailInfo,
    ListView
  },
  data() {
    return {
      orderList: [
        {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
        {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
        {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
      ],
      serviceList: [
        {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
        {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
.profile-nav{
  background-color: var(--color-tint);
  color: #fff;
}
.profile-info{
   display: flex;
 }
</style>