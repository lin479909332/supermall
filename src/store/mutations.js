import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  //mutations的主要作用就是修改状态
  //因此mutations内完成的事情应该尽量简单点
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}
