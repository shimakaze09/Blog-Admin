import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login";
import Framework from "@/views/Framework";
import NotFound from '@/views/404'
import Home from "@/views/Home"
import Categories from "@/views/Category/Categories"
import FeaturedCategories from "@/views/Category/FeaturedCategories";
import Posts from "@/views/Blog/Posts"
import FeaturedPosts from "@/views/Blog/FeaturedPosts";
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
      component: Framework,
      children: [
        {
          path: '',
          name: 'System Home Page',
          component: Home,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        },
        {
          path: 'category/list',
          name: 'Category List',
          component: Categories
        },
        {
          path: 'category/featured',
          name: 'Featured Categories',
          component: FeaturedCategories
        },
        {
          path: 'post/list',
          name: 'Article List',
          component: Posts
        },
        {
          path: 'post/featured',
          name: 'Featured Articles',
          component: FeaturedPosts
        },
        {
          path: 'photo/list',
          name: 'Photo List',
          component: Photos
        },
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
