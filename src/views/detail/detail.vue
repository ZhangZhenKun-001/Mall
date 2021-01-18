<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
      <goods-list :goodsList="recommendList"/>
    </scroll>
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

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from 'components/content/goods/GoodsList.vue';

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "common/utils";
import {itemListenerMinIn} from "common/mixin";

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
  },
  mixins:[itemListenerMinIn],
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
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
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
    getRecommend().then( (res) => {
      this.recommendList = res.data.list
      console.log(res.data.list)
    })
  },
  methods: {
    imageLoad() {
      this.newRefresh();
    },
  },
  mounted() {
    this.newRefresh();
  },
  // 该组件没有缓存，所以离开的时候会销毁
  destroyed(){
    this.$bus.$off("itemImageLoad",this.itemImgListener)
  },
};
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
  height: calc(100% - 44px);
  /* overflow: hidden; */
}
</style>