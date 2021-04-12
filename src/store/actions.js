import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addToCart(context, payload) {
    return new Promise((resolve) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      
      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}
