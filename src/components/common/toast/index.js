import Toast from './Toast'
const obj = {}
// install 默认传入参数vue
obj.install = function (Vue) {
  // Vue.extend(Toast)
  // document.body.appendChild(Toast.$el)

  // 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 创建组件对象
  const toast = new toastContrustor()

  // 手动挂载某一个元素
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)
  
  Vue.prototype.$toast = toast
}

export default obj