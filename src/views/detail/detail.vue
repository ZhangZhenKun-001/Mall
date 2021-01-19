<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      :detailCurrentIndex="currentIndex"
      ref="nav"
    />

    <scroll
      class="detail-content"
      @scroll="contentScroll"
      :probeType="3"
      ref="scroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
        ref="goods"
      />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goodsList="recommendList" ref="recommend" />
    </scroll>
    <back-top class="back-top" @click.native="BackTop" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMinIn, backTop } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMinIn, backTop],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      detailTopNav: [],
      getDetailTopNav: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 1.获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取价格相关信息数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺相关信息
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.用户评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommendList = res.data.list;
      // console.log(res.data.list);
    });
    // 获取商品、参数、评论、推荐到顶部的距离
    this.getDetailTopNav = debounce(() => {
      this.detailTopNav = [];
      this.detailTopNav.push(0);
      this.detailTopNav.push(this.$refs.params.$el.offsetTop);
      this.detailTopNav.push(this.$refs.comment.$el.offsetTop);
      this.detailTopNav.push(this.$refs.recommend.$el.offsetTop);
      // 在数组最后添加一个最大值
      this.detailTopNav.push(Number.MAX_VALUE);
      // console.log(this.detailTopNav);
    }, 100);
  },

  mounted() {
    this.newRefresh();
  },
  // 该组件没有缓存，所以离开的时候会销毁
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    // 图片加载一次发送一次
    imageLoad() {
      // 刷新scroll高度
      this.newRefresh();
      this.getDetailTopNav();
    },
    titleClick(index) {
      // console.log(index)
      // 详情页顶部导航栏点击去到指定位置
      this.$refs.scroll.scrollTo(0, -this.detailTopNav[index], 150);
    },
    contentScroll(position) {
      const positionY = -position.y;
      const length = this.detailTopNav.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          positionY >= this.detailTopNav[i] &&
          positionY < this.detailTopNav[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.currentIndex);
        }
      }
      // 返回顶部图标是否显示
      this.showBackTop(position)
    },
    // 添加到购物车
    addToCart(){
      // console.log("+++++++++")
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将商品添加到购物车中
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)
    }
  }
}
</script>

<style>
#detail {
  position: relative;
  z-index: 9999;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9999;
  background-color: #fff;
}
.detail-content {
  height: calc(100% - 44px - 58px);
  /* overflow: hidden; */
}
</style>
