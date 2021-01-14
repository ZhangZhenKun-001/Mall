<template>
  <div class="goods-item">
    <a :href="goodsListItem.link">
      <img :src="goodsListItem.show.img" alt="" @load="imageLoad"/>
      <div class="goods-info">
        <p>{{ goodsListItem.title }}</p>
        <span class="price">{{ goodsListItem.price }}</span>
        <span class="collect">{{ goodsListItem.cfav }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    imageLoad(){
      // 重新加载完数据后刷新scroll内容的高度
      this.$bus.$emit('itemImageLoad')
    }
  },
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 45%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>