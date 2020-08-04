<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

import { getDetail } from "network/detail.js";
export default {
  data() {
    return {
      title: null
    };
  },
  components: {
    DetailNavBar
  },
  created() {
    console.log(this.$route.params);
    this.title = this.$route.params.title;

    // 根据id请求详情数据
    getDetail().then(res => {
      console.log(res);
    });
  }
};
</script>

<style></style>
