import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // mutations唯一的目的就是修改state种状态
  // 其中的每个方法尽可能完成单一事件
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}
