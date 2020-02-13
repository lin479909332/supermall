<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'

  import {getDetaildata, Goods} from 'network/detail'


  export default {
    name: "Detail",
    data(){
      return{
        iid: null,
        topImages:[],
        goods:{}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    created() {
      //1、获取iid并保存
      this.iid = this.$route.params.iid

      //2、根据iid请求数据
      getDetaildata(this.iid).then(res =>{
        //获取图片轮播数据
        console.log(res);
        const data = res.result
        this.topImages = res.result.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      })
    }
  }
</script>

<style scoped>

</style>
