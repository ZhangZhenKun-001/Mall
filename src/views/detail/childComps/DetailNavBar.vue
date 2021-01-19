<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          class="title-item"
          v-for="(item, index) in title"
          :key="index"
          :class="{ active: isActive(index) }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  props: {
    detailCurrentIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    NavBar,
  },
  // created() {
  //   this.$bus.$on("contentScroll", () => {
  //     this.currentIndex = this.detailCurrentIndex;
  //     // console.log(this.detailCurrentIndex);
  //   });
  // },
  methods: {
    titleClick(index) {
      // this.$bus.$off("contentScroll");
      this.currentIndex = index;
      this.$emit("titleClick", this.currentIndex);
    },
    isActive(index) {
      return index === this.currentIndex;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}

.left img {
  margin-top: 11px;
}
</style>