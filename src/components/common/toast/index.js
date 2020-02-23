const obj = {};

import Toast from './Toast.vue'

obj.install = function (Vue) {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  //2.new的方式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastConstructor();

  //3.把组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement("div"));

  //4.添加到body（toast.$el就是上一步所创建的div）
  document.body.appendChild(toast.$el);

  //给Vue原型加上$toast 指向Toast
  Vue.prototype.$toast = toast;
}

export default obj;
