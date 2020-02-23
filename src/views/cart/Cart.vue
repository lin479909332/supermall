<template>
  <div class="cart">
    <!-- 导航部分 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 内容部分 -->
    <cart-list/>
    <!-- 底部部分 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartList from './childComps/CartList'

  import NavBar from 'components/common/navbar/NavBar'
  import CartBottomBar from './childComps/CartBottomBar'

  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //数组写法
      //...mapGetters(['cartLength','cartList'])
      //对象写法
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
