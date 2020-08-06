<template>
  <swiper class="swiper-item">
    <swiper-item v-for="(item, index) in topImage" :key="index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    topImage: {
      type: Array,
      deafult() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>
