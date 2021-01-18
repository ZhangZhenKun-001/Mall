import { debounce } from "./utils"
export const itemListenerMinIn = {
  data(){
    return {
      itemImgListener:null,
      newRefresh:null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      this.newRefresh();
      // 检测this.$refs.scroll是否已经完成挂载，完成挂载再执行后面的代码
      // this.$refs.scroll && this.$refs.scroll.refresh();
      // 使用防抖函数来执行 refresh
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener)
    console.log("这是混入的内容")
  }
}