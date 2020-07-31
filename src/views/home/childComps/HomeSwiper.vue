<template>
  <swiper>
    <swiper-item v-for="(item, index) in bannerss" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    bannerss: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    SwiperItem,
    Swiper
  }
};
</script>

<style></style>
