// 封装刷新scroll高度和发送图片加载
import { debounce } from "./utils"
export const itemListenerMinIn = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
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
    // console.log("这是混入的内容")
  }
}

// 封装回到顶部功能
import BackTop from "components/content/backTop/BackTop.vue";
export const backTop = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    BackTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      this.$refs.scroll.refresh();
    },
    showBackTop(position) {
      if (position.y < -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    }
  }
}

import {POP, NEW, SELL} from "./const";
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
