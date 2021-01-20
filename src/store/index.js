import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions"
import state from "./state"

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

export default store;

