import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

import axios from 'src/utils/myAxios';
Vue.prototype.$http = axios;
import api from 'src/api/api'
Vue.prototype.$api = api;
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {loading:"/src/icons/svg/spinner.svg" })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
