<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkAll">
      <check-button
        class="check-button"
        :class={isCheckAll:ClickCheckAll}
      />
      <span>全选</span>
    </div>

    <div class="totalPrice">
      合计:{{ totalPrice }}
    </div>

    <div class="calculate">
      去计算({{ totalNumber }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartButtonBar",
  components: {CheckButton},
  data() {
    return {
      cartList: this.$store.state.cartList
    }
  },
  methods: {
    //全选功能
    checkAll() {
      if (this.ClickCheckAll)
        this.cartList.forEach(item => item.checked = false)
      else
        this.cartList.forEach(item => item.checked = true)
    }
  },
  computed: {
    totalPrice() {
      //过滤器检测是否被选中
      return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked
        //  reduce计算总和
      }).reduce((preValue, item) => {
        return item.price * item.count + preValue
        //  toFixed确定保留几位小数
      }, 0).toFixed(2)
    },
    totalNumber() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    //全选按钮是否被选中
    ClickCheckAll() {
      //遍历
      // for (let i = 0; i < cartListItem.length; i++) {
      //   // console.log(cartListItem.length)
      //   if (cartListItem[i].checked !== true) {
      //     return false
      //   }
      //   if (i === cartListItem.length - 1) {
      //     return true
      //   }
      // }
      //高阶数组方法
      if (this.cartList.length === 0)
        return false
      return !this.cartList.find(item => !item.checked)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  /*line-height: 40px;*/
  /*text-align: center;*/
}

.check-content {
  display: flex;
  text-align: center;
  align-items: center;
  /*line-height: 40px;*/
}

.check-button {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}

.totalPrice {
  /*display: inline;*/
  flex: 1;
  line-height: 40px;
  margin-left: 30px;
}

.calculate {
  /*float: right;*/
  width: 100px;
  line-height: 40px;
  text-align: center;
  background-color: red;
  color: #fff;
}

.isCheckAll {
  background-color: red;
  border-color: red;
}
</style>
