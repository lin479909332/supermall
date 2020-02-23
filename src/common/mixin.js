import { debounce } from 'common/utils'
import {BACKTOP_DISTANCE} from 'common/const'
import {POP, NEW, SELL} from 'common/const'

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

export const backTopMixin = {
  data() {
    return{
      isShowBackTop: false
    }
  },
  methods:{
    backClick(){
      //回到顶部
      //this.$refs.scroll.scroll.scrollTo(0,0,300)
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      //console.log(this.currentType);
    }
  }
}
