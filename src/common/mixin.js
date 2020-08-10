import { debounce } from "./utils";
import BackTop from "components/contents/backTop/BackTop";
import { BACK_TOP_POSITION } from "./const";

export const itemLisenerMixin = {
  // components;
  // methods;都可以混入
  data() {
    return {
      ItemImageLisenr: null
    };
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.ItemImageLisenr = () => {
      newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.ItemImageLisenr);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 700);
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_TOP_POSITION;
    }
  }
};
