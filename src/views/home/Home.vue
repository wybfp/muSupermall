<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :bannerss="banners.list"></home-swiper>
    <recommend-view :recommend="recommends.list"> </recommend-view>
    <feature-view></feature-view>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
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
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/contents/tabControl/TabControl";
import NavBar from "components/common/navbar/NavBar";
import GoodList from "components/contents/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      good: {
        pop: { list: [] },
        new: { list: [] },
        sell: { list: [] }
      },
      // goods: {
      //   pop: { page: 0, list: [] },
      //   new: { page: 0, list: [] },
      //   sell: { page: 0, list: [] }
      // },
      currentType: "pop"
    };
  },
  computed: {
    showGoods() {
      return this.good[this.currentType].list;
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // this.getHomeGoods();
  },
  methods: {
    // 事件监听相关
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
      getHomeGoods(type).then(res => {
        this.good[type].list.push(...res.data.banner.list);
        // console.log(this.good[type].list);
      });
    }
    // getHomeGoods(type) {
    //   const page = this.goods[type].page + 1;
    //   getHomeGoods(type, page).then(res => {
    //     console.log(res);
    //     this.goods[type].list.push(...res.data.list);
    //     this.goods[type].page += 1;
    //   });
    // }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
