import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      //数组的find方法 如果数组元素（item）的iid与传入的商品iid有重复 就返回item item又赋值给oldProduct
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct){
        //有重复 重复商品数量+1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else{
        //没有重复 添加商品，且把商品的数量设置为1
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}
