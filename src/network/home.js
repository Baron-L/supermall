import { request } from "./requst";
export function getHomeDataList () {
  return request({
    url: '/home/multidata'
  })
}  


export function getHomeGoodsList (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}