<template>
  <div id="app">
    <!-- 防止组件被销毁 -->
    <keep-alive exclude="Detail"> 
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>


<style>
@import "assets/css/base.css";
</style>
