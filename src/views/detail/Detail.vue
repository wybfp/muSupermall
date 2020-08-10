<template>
  <div id="detail">
    <!-- 事件可以直接写 -->
    <detail-nav-bar
      class="detail-navbar"
      @titleClick="titleClick"
      ref="detaiNav"
    ></detail-nav-bar>
    <scroll
      class="detail-content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 属性topImage  写入top-image 不区分大小写找不到topimage-->
      <detail-swiper :top-image="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-image-info>
      <detail-param ref="param" :param-info="paramInfo"></detail-param>
      <detail-comment
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParam from "./childComps/DetailParam";
import DetailComment from "./childComps/DetailComment";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/contents/goods/GoodsList";

import { debounce } from "../../common/utils";
import { itemLisenerMixin, backTopMixin } from "../../common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getDetailRecommend
} from "network/detail.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // isShowBackTop: false
      // ItemImageLisenr: null
    };
  },
  mixins: [itemLisenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParam,
    DetailComment,
    DetailBottomBar,
    Scroll,
    GoodList
  },
  created() {
    // console.log(this.$route.params);

    this.iid = this.$route.params.iid;

    // 根据id请求详情数据
    this.getDetail();

    // 请求推荐数据
    this.getDetailRecommend();
    //防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    //   const refresh = this.debounce(this.$refs.scroll.refresh, 100);
    //   this.ItemImageLisenr = () => {
    //     refresh();
    //   };
    //  this.$bus.$on("itemImageLoad", this.ItemImageLisenr);
  },
  // 有缓存在keepalive可以用activated()  deactivated()
  // 没有就 destroyed()
  destroyed() {
    this.$bus.$off("itemImageLoad", this.ItemImageLisenr);
  },

  methods: {
    // backClick() {
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 700);
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    getDetail() {
      getDetail(this.iid).then(res => {
        // 获取顶部的轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // console.log(this.goods);

        // 店铺信息
        this.shop = new Shop(data.shopInfo);

        // 商品的详情数据
        this.detailInfo = data.detailInfo;
        console.log(this.detailInfo);

        // 获取参数信息
        this.paramInfo = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule
        );
        // console.log(this.paramInfo);
        // 评论信息
        if (data.rate.cRate !== 0) this.commentInfo = data.rate.list[0];

        // 渲染完以后进行回调 dom 渲染完
        // 但是图片没有加载完
        // offsetTop不对一般都是图片问题
        //   this.$nextTick(() => {
        //     this.themeTopYs = [];
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //     console.log(this.themeTopYs);
        //   });
      });
    },
    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopY();
    },

    getDetailRecommend() {
      getDetailRecommend().then(res => {
        this.recommends = res.data.list;
      });
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      const positionY = -position.y;
      // console.log(this.themeTopYs.length);
      // for (let i in this.themeTopYs) {
      // i是字符串类型
      // i*1
      // parseInt(i);
      // if (
      //   positionY > this.themeTopYs[i] &&
      //   positionY < this.themeTopYs[i + 1]
      // ) {
      //   console.log(i);
      // }
      // i = parseInt(i);
      // if (
      //   this.currentIndex !== i &&
      //   ((i < this.themeTopYs.length - 1 &&
      //     positionY >= this.themeTopYs[i] &&
      //     positionY < this.themeTopYs[i + 1]) ||
      //     (i === this.themeTopYs.length - 1 &&
      //       positionY >= this.themeTopYs[i]))
      // ) {
      //   this.currentIndex = i;
      //   // console.log(this.currentIndex);
      //   this.$refs.detaiNav.currentIndex = this.currentIndex;
      // }}

      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detaiNav.currentIndex = this.currentIndex;
        }
      }
      // this.isShowBackTop = -position.y > BACK_TOP_POSITION;
      this.listenShowBackTop(position);
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-content {
  /* 运算符前后都要保留空格 */
  background-color: #fff;
  height: calc(100% - 44px - 49px);
  /* overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0; */
}
</style>
