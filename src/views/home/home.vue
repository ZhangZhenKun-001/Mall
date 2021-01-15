<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick" 
      ref="tabControl1"
      class="tab-control"
      v-show="isShowTabControl"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="ContentScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommds-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
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
import { debounce } from "common/utils";

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
      tabOffsetTop: 0,
      isShowTabControl: false,
      saveY:0
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
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    // 1. 监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      // 检测this.$refs.scroll是否已经完成挂载，完成挂载再执行后面的代码
      // this.$refs.scroll && this.$refs.scroll.refresh();
      // 使用防抖函数来执行 refresh
      refresh();
    });
  },
  // 回到离开前页面的位置
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh()
  },
  // 记录离开页面时的位置信息
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    /**
     * 事件监听相关方法
     */

    // 监听轮播图图片是否加载完成
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    pullingUp() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finshPullUp();
    },
    ContentScroll(position) {
      // console.log(position)
      // 1. 返回顶部图标是否显示
      if (position.y < -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
      // 2. 状态栏是否显示
      this.isShowTabControl = -position.y > this.tabOffsetTop;
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
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
  /* vh代表视口，整个可见窗口大小 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  /**
  height: calc(100vh - 44px - 49px);
  这个方法content不能脱离文档流，后面使用tab-content时不能覆盖原来的tab-content

   */
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 9999;

}
</style>