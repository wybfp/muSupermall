<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll" :probe-type="3">
      <detail-swiper :top-image="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
       <detail-image-info :detail-info="detailInfo" @imageLoad="imageLoad" ></detail-image-info>
      <detail-param :param-info="paramInfo"></detail-param>
      <detail-comment :comment-info="commentInfo"></detail-comment>
      <good-list :goods="recommends"></good-list>
    </scroll>
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

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/contents/goods/GoodsList";

import { debounce } from "../../common/utils";
import { itemLisenerMixin } from "../../common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getDetailRecommend
} from "network/detail.js";
export default {
 name:"Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
      // ItemImageLisenr: null
    };
  }, 
  mixins: [itemLisenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParam,
    DetailComment,
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
      });
    },
      imageLoad() {
      this.$refs.scroll.refresh();
    },
    getDetailRecommend() {
      getDetailRecommend().then(res => {
        this.recommends = res.data.list;
      });
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
  height: calc(100% - 44px);
  /* overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0; */
}
</style>
