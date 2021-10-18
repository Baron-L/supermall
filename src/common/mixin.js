import { debounce } from './utils'
import BackTop from 'components/business/backTop/BackTop'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted ()  {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      this.refresh()
    }
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
     },
  },
}