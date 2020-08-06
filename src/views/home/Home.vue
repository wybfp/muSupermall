<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <!-- probe-type不加冒号统一当做字符串传，加冒号传具体类型 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :bannerss="banners.list"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommend="recommends.list"> </recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>10</li>
      </ul>
    </scroll>
    <!-- 组件不能直接监听点击,加native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/contents/tabControl/TabControl";
import NavBar from "components/common/navbar/NavBar";
import GoodList from "components/contents/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/contents/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "../../common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],

      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      ItemImageLisenr: null
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // 有缓存在keepalive可以用activated()  deactivated()
  activated() {
    // console.log("新建");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存y值
    // console.log("销毁");
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.ItemImageLisenr);
  },

  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // 监听item图片事件
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 100);
    this.homeItemImageLisenr = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.ItemImageLisenr);
  },

  methods: {
    // 事件监听相关
    // 防抖动函数debounce 节流throttle可以研究
    // debounce(func, delay) {
    //   let timer = null;
    //   return function(...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },
    tabClick(index) {
      //  console.log(1);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      console.log(this.currentType);
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 700);
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner;
        // console.log(this.banners);
        this.recommends = res.data.recommend;
        // console.log(this.recommends);
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 800;
      // 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>
// scoped是作用域
<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh==viewport height */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 51px;
} */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>
