import { debounce } from "./utils";

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
