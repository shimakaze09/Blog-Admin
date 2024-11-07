import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

// Import child modules
import app from './modules/app'

const store = new vuex.Store({
  modules: {
    app: app
  }
})

export default store
