<template>
  <div id="childComps">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
import { getHomeMultidata } from "network/home";

export default {
  name: "childComps",
  props: {
    banners: {
      type: Array,
      // 定义为函数，每次返回的值不会重复
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style>
</style>