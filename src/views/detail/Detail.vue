<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
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
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getDetaildata, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin,backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    data(){
      return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,
      }
    },
    mixins: [itemListenerMixin,backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    created() {
      //1、获取iid并保存
      this.iid = this.$route.params.iid

      //2、根据iid请求数据
      getDetaildata(this.iid).then(res =>{
        //2.1、获取图片轮播数据
        //console.log(res);
        const data = res.result
        this.topImages = res.result.itemInfo.topImages
        //2.2、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //2.3、获取商家信息
        this.shop = new Shop(data.shopInfo)
        //2.4、获取商品的详情数据
        this.detailInfo = data.detailInfo
        //2.5、获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //2.6、获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      //3、请求推荐数据
      getRecommend().then(res =>{
        //console.log(res);
        this.recommends = res.data.list
      })
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        //刷新better-scroll
        this.$refs.scroll.refresh()
        //获取参数 评论 推荐的Y坐标
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        //console.log(this.themeTopYs);
      },
      titleClick(index){
        //滑动到指定区域
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
      },
      contentScroll(position){
        const positionY = -position.y
        //console.log(this.positionY);
        //[0, 4192       i=0
        // 4192, 5205    i=1
        // 5205, 5421    i=2
        // 5421]    i=3
        let length = this.themeTopYs.length
        // for (let i = 0; i < length; i++){
        //   if (this.currentIndex !== i &&
        //     ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
        //       || (i === length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        for (let i = 0; i < length-1; i++){
          if (this.currentIndex !== i &&
            ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.listenShowBackTop(position)
      },
      addToCart(){
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice

        // this.$store.dispatch('addCart',product).then(res =>{
        //   console.log(res);
        // })

        this.addCart(product).then(res => {
          this.$toast.show(res)
        })
      },
    },
    mounted() {
      //console.log('我是detail');
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 93px);
  }
</style>
