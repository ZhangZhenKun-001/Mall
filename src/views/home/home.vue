<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <home-recommds-view :recommends="recommends" />
    <feature-view />
    <tab-control :title="['流行', '新款', '精选']" @tabClick="tabClick" />
    <goods-list :goodsList="showGoods" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommdsView from "./childComps/HomeRecommdsView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

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
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = 'sell';
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
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
};
</script>
 
<style>
#home {
  padding-top: 44px;
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
</style>