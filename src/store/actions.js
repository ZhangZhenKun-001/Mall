export default {
  addCart(context, payload) {
    return new Promise( (resolve,reject) => {
      // 查找cartList.iid是否和payload.iid相等，相等则返回该对象
      let product = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })
      if (product) {
        // product.count += 1;
        context.commit('addCounter', product)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1;
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('商品加入到购物车')
      }
    } )
  }
}
