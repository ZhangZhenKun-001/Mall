<template>
  <div class="toast" v-show="isShow">
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message = "默认文字", duration = 1500) {
      // console.log("-----------")
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ""
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 9999;
  /*移动自身位置*/
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  padding: 5px 10px;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
}

</style>
