import { request } from "./request";
// export function getDetail(iid) {
export function getDetail() {
  return request({
    // url: "/detail",
    url: "/home/multidata"
    // paramas: {
    //   iid
    // }
  });
}
