export default {
  addCounter(state, payload){
    payload.count++
  },
  addToCart(state,payload){
    //默认商品是选中状态
    payload.checked = true
    state.cartList.push(payload)
  }
}
