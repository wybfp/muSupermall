<template>
  <div class="good-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style>
.good-list {
  display: flex;
  /* 断行 */
  flex-wrap: wrap;
  justify-content: space-around;
  /* 弹性盒子元素会平均地分布在行里 */
  background-color: var(--color-background);

  padding: 2px;
}
</style>
