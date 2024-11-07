import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

// Import child modules
import app from './modules/app'
import tab from './modules/tab'

const store = new vuex.Store({
  modules: {
    app,
    tab
  }
})

export default store
