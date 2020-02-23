<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">结算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.count * item.price
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        //当购物内没有数据的时候 不全选
        if (this.cartList.length === 0) return false

        //filter 当购物车内有一个处于不选中状态时（即length>0）进行取反，大于0的数字取反为false，即为不选中
        //return !this.cartList.filter(item => !item.checked).length

        //find 查找购物车内是否有处于不选中的项目 如果有就返回该项目，再进行取反就是false 如果没有就返回undefined取反就是true
        return !this.cartList.find(item => !item.checked)

        //遍历
        // for (let item of this.cartList){
        //   //如果出现一个处于未选中的项目 就返回false
        //   if (!item.checked){
        //     return false
        //   }
        //   //全部没有未选中 返回true
        // }return true
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if (this.checkLength===0){
          this.$toast.show('请选择购买的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    background: #eee;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background: red;
    text-align: center;
    color: #fff;
  }
</style>
