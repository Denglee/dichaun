// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
//
// Vue.config.productionTip = false
//
//
//
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
import Axios from 'axios'
Vue.config.productionTip = false

// 引入element
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// 使用 mint-ui引入全部的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


// 引入自己的全局的css
import './assets/css/global.css'

// 注册全局组件
// import topTabbar from '@/components/topTabbar'
// Vue.component(topTabbar.name,topTabbar)
// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)

// 引用md5
// import md5 from 'js-md5';


// 配置公共的url
Axios.defaults.baseURL = 'https://api.it120.cc/ld'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

// 配置 axios
Vue.prototype.$axios=Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

