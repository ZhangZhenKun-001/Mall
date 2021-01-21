import Toast from "./Toast"

const obj = {}
//自定义插件
obj.install = function (vue){
//  1.创建组件构造器
  const toastConstructor = vue.extend(Toast)

//  2.new的方式，根据组件构造器，创建一个组件对象
  const toast = new toastConstructor()

//  3.将创建的组件挂载到某一个元素上
  toast.$mount(document.createElement('div'))

//  4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  vue.prototype.$toast = toast
}

export default obj;
