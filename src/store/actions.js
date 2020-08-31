import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";
export default {
  addCart(context, payload) {
    //   state.cartList.push(payload);

    // let oldproduce = null;
    //   for (let item of state.cartList) {
    //     if (item.iid === payload.iid) {
    //       oldproduce = item;
    //     }
    //   }
    //   if (oldproduce) {
    //     oldproduce.count += 1;
    //   } else {
    //     payload.count = 1;
    //     state.cartList.push(payload);
    //   }

    //   let index = state.cartList.indexOf(payload);
    //   if(index===-1)

    //   let produce = state.cartList.find(function(item) {
    //     return item.iid === payload.iid;
    //   });

    let oldproduce = context.state.cartList.find(
      item => item.iid === payload.iid
    );
    if (oldproduce) {
      // oldproduce.count += 1;
      context.commit(ADD_COUNTER, oldproduce);
    } else {
      payload.count = 1;
      // state.cartList.push(payload);
      context.commit(ADD_TO_CART, payload);
    }
  }
};
