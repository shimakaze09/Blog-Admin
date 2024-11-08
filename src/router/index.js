import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import NotFound from '@/views/404'
import Intro from "@/views/Intro/Intro"
import Test from "@/views/Intro/Test"
import Posts from "@/views/Blog/Posts"
import Photos from "@/views/Photography/Photos"

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
        {
          path: 'posts',
          name: 'Post List',
          component: Posts,
          meta: {
            icon: 'fa fa-list fa-lg',
            index: 1
          }
        },
        {
          path: 'photos',
          name: 'Photo List',
          component: Photos,
          meta: {
            icon: 'fa fa-picture-o fa-lg',
            index: 1
          }
        },
        {
          path: 'test',
          name: 'Test',
          component: Test,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 3
          }
        },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

router.beforeEach((to, from, next) => {
  // After successful login on the login page, user information will be saved in session storage
  // Its lifetime is the session lifecycle, and it becomes invalid when the page is closed.
  let userName = sessionStorage.getItem('user')

  if (to.path === '/login') {
    // If accessing the login page, if user session information exists, it means the user has logged in before, redirect to the home page
    if (userName) next({ path: '/' })
    else next()
  } else {
    if (!userName) {
      // If accessing a non-login page and user session information does not exist, it means the user has not logged in, so redirect to the login page
      next({ path: '/login' })
    }
    next()
  }
})

export default router
