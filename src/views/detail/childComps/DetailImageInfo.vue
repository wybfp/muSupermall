<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          v-for="(imgItem, imgIndex) in item.list"
          :key="imgIndex"
          :src="imgItem"
          @load="imgLoad"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      // console.log(this.counter);
      // console.log(this.imagesLength);
      // 判断所有的图片都加载完，那么进行一次回调
      if (++this.counter === this.imagesLength) {
        // console.log("我加载结束了");
        this.$emit("imageLoad");
      }
    }
  },
  //   监听对象的变化
  watch: {
    detailInfo() {
      // 获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
      // console.log( this.imagesLength);
    }
  }
};
</script>

<style scoped>
.goods-info {
  /* 上下 左右 */
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background-color: #333333;
}
.info-desc .end::after {
  right: 0;
}
.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}

.info-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.info-list img {
  width: 100%;
}
</style>
