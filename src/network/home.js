import { request } from "./requst";
export function getHomeDataList () {
  return request({
    url: '/home/multidata'
  })
}  