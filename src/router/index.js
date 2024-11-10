import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import NotFound from '@/views/404'
import Intro from "@/views/Intro/Intro"
import Categories from "@/views/Blog/Categories"
import Posts from "@/views/Blog/Posts"
import Photos from "@/views/Photography/Photos"

// Override the default push method to catch errors
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'System Introduction',
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        },
        { path: 'category/list', name: 'Category List', component: Categories },
        { path: 'post/list', name: 'Post List', component: Posts },
        { path: 'photo/list', name: 'Photo List', component: Photos },
      ]
    },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/404', name: 'NotFound', component: NotFound },
  ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  let userName = localStorage.getItem('user')

  if (to.path === '/login') {
    // Redirect to home if user is already logged in
    if (userName) next({ path: '/' })
    else next()
  } else {
    if (!userName) {
      // Redirect to login if not logged in
      next({ path: '/login' })
    }
    next()
  }
})

export default router
