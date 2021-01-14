<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="ContentScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" />
      <home-recommds-view :recommends="recommends" />
      <feature-view />
      <tab-control :title="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goodsList="showGoods" />
    </scroll>
    <back-top class="back-top" @click.native="BackTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommdsView from "./childComps/HomeRecommdsView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "home",
  components: {
    HomeSwiper,
    HomeRecommdsView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 保存当前选择浏览数据的类型
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    //  请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
    // 检测this.$refs.scroll是否已经完成挂载，完成挂载在执行后面的代码
    this.$refs.scroll && this.$refs.scroll.refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    pullingUp() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finshPullUp();
    },
    ContentScroll(position) {
      // console.log(position)
      if (position.y < -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    BackTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res.data);
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // list.push(...res.data.list)  可以自动将list中的元素自动取出并且插入到新的list中
        // 等价于
        // for(let item of res.data.list){
        //   this.goods[type].list.push(item)
        // }
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>
 
<style scoped>
#home {
  padding-top: 44px;
  /* vh代表视口，整个可见窗口大小 */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9999;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9999;
}

.content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>