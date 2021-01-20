<script>
import CartButtonBar from "@/views/cart/childComps/CartButtonBar";

export default {
  components: {CartButtonBar}
}
</script>
<template>
  <div id="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!--商品列表-->
    <Cart-list/>
    <!--底部消息汇总-->
    <cart-button-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartButtonBar from "./childComps/CartButtonBar";

import {mapGetters} from 'vuex'

export default {
  name: 'cart',
  components: {NavBar, CartList, CartButtonBar},
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
  position: relative;
  z-index: 9999;
}
</style>
