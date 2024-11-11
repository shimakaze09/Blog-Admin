// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import Exceptionless from './utils/exceptionless'
import ErrorHandler from "./utils/errorHandler"
import global from './utils/global'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

// Import Element
Vue.use(ElementUI)
// Import API module
Vue.use(api)
// Exceptionless module
Vue.use(Exceptionless)
// mavon-editor
Vue.use(mavonEditor)
// Global asynchronous handling module
Vue.use(ErrorHandler)

// Mount global configuration module
Vue.prototype.global = global

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
