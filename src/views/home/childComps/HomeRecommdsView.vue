<template>
  <div id="HomeRecommendsView">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommends-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: { 
  },
  name: "HomeRecommendsView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
#HomeRecommendsView {
  display: flex;
  text-align: center;
  font-size: 12px;

  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommends-item {
  flex: 1;
}
.recommends-item img {
  width: 68px;
  margin-bottom: 10px;
}
</style>