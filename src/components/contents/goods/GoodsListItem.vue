<template>
  <div class="goods-item">
    <img :src="goodsItem.image" alt="" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.height }}</span>
      <span class="collect">{{ goodsItem.width }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>
.goods-item {
  padding-bottom: 35px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
  border: 3px solid var(--color-tint);
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
  /* 当内容溢出以...代替 */
  text-overflow: ellipsis;
  /* 强制在同一行内显示所有文本，合并文本间的多余空白，直到文本结束或者遭遇br对象。  */
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
  background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>
