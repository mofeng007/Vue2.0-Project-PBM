import Vue from 'vue';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
// import {Row,Button} from 'element-ui';
import ElementUI from 'element-ui';
import router from './router';
import store from './store';
import './api/mock';

// 重置默认样式
import './assets/css/normalize.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
