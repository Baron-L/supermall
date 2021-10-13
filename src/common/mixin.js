import { debounce } from './utils'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted ()  {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      refresh()
    }
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}