import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login";
import Framework from "@/views/Framework";
import NotFound from '@/views/404'
import Home from "@/views/Home"
import Categories from "@/views/Category/Categories"
import FeaturedCategories from "@/views/Category/FeaturedCategories"
import Posts from "@/views/Blog/Posts"
import TopPost from "@/views/Blog/TopPost"
import FeaturedPosts from "@/views/Blog/FeaturedPosts"
import Photos from "@/views/Photography/Photos"
import FeaturedPhotos from "@/views/Photography/FeaturedPhotos"
import Cookies from "js-cookie";

// Override Vue Router's push method to catch errors
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
          name: 'Home Page',
          component: Home,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        },
        { path: 'category/list', name: 'Category List', component: Categories },
        { path: 'category/featured', name: 'Featured Category', component: FeaturedCategories },
        { path: 'post/list', name: 'Post List', component: Posts },
        { path: 'post/featured', name: 'Featured Post', component: FeaturedPosts },
        { path: 'post/top', name: 'Top Post', component: TopPost },
        { path: 'photo/list', name: 'Photo List', component: Photos },
        { path: 'photo/featured', name: 'Featured Photo', component: FeaturedPhotos },
      ]
    },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/404', name: 'NotFound', component: NotFound },
  ]
})

// Route Guards
router.beforeEach((to, from, next) => {
  let userName = localStorage.getItem('user')
  let expiration = localStorage.getItem('expiration')

  // Token Expiration Check
  if (expiration) {
    let now = new Date()
    let expirationTime = new Date(expiration)
    if (now > expirationTime) {
      console.log('token has expired, redirecting to login page')
      localStorage.removeItem('user')
      localStorage.removeItem('expiration')
      Cookies.set('token', null)
      router.push('/login')
    }
  }

  if (to.path === '/login') {
    // If accessing the login page, check if user session exists
    if (userName) next({ path: '/' })
    else next()
  } else {
    if (!userName) {
      // If not logged in and trying to access a protected route, redirect to login page
      next({ path: '/login' })
    }
    next()
  }
})

export default router
