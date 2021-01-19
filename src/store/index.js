import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      // 查找cartList.iid是否和payload.iid相等，相等则返回该对象
      //
      //
      let product = state.cartList.find( item => {item.iid === payload.iid})
      if(product){
        product.count += 1;
      }else{
        payload.count = 1;
        state.cartList.push(payload)
      }
    }
  },
})

export default store;
