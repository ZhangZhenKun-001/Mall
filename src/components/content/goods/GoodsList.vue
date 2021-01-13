<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goodsList"
      :key="index"
      :goodsListItem="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  components: { GoodsListItem },
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>