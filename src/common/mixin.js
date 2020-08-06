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
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.ItemImageLisenr = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.ItemImageLisenr);
  }
};
