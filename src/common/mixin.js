import { debounce } from 'common/utils'
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    //防抖函数
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    //监听图片加载完成
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    //console.log('我是mixin');
  }
}
