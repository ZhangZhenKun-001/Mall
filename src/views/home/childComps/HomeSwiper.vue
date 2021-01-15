<template>
  <div id="childComps">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
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
  data(){
    return {
      isLoad:false
    }
  },
  props: {
    banners: {
      type: Array,
      // 定义为函数，每次返回的值不会重复
      default() {
        return [];
      },
    },
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style>
</style>