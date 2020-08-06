<template>
  <div id="app">
    <!-- 点击另一个页面当前页面不会被销毁-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/contents/mainTabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
