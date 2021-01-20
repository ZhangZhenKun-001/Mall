export default {
  addCart(context, payload) {
    // 查找cartList.iid是否和payload.iid相等，相等则返回该对象
    let product = context.state.cartList.find(item => {
      return item.iid === payload.iid
    })
    if (product) {
      // product.count += 1;
      context.commit('addCounter', product)
    } else {
      payload.count = 1;
      // state.cartList.push(payload)
      context.commit('addToCart', payload)
    }
  }
}
