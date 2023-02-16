import Vue from 'vue'
import App from './App.vue'

//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
// 引入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入store
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// 全局过滤器
Vue.filter('formatCreateTime', function (time) {
  let formatedTime = new Date(time);
  let seconds = formatedTime.getSeconds();
  let minutes = formatedTime.getMinutes();
  seconds < 10 ? seconds = '0' + String(seconds) : seconds = String(seconds);
  minutes < 10 ? minutes = '0' + String(minutes) : minutes = String(minutes);
  time = `${minutes}:${seconds}`;
  return time
})

