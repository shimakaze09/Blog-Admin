import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login";
import Framework from "@/views/Framework";
import NotFound from '@/views/404'
import Home from "@/views/Home"
import Categories from "@/views/Category/Categories"
import FeaturedCategories from "@/views/Category/FeaturedCategories"
import CommentNeedAuditList from '@/views/Comment/CommentNeedAuditList.vue'
import Posts from "@/views/Blog/Posts"
import TopPost from "@/views/Blog/TopPost"
import FeaturedPosts from "@/views/Blog/FeaturedPosts"
import EditPost from "@/views/Blog/EditPost";
import UploadPost from "@/views/Blog/UploadPost";
import Photos from "@/views/Photography/Photos"
import FeaturedPhotos from "@/views/Photography/FeaturedPhotos"
import VisitRecordList from "@/views/VisitRecord/List"
import ConfigList from "@/views/Config/List"
import LinkList from '@/views/Link/List'
import LinkExchangeList from '@/views/LinkExchange/List.vue'
import * as auth from '@/utils/auth'

// Override Vue Router's push method to catch errors
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  mode: 'hash',
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
        {path: 'category/list', name: 'Category List', component: Categories},
        {path: 'category/featured', name: 'Featured Category', component: FeaturedCategories},
        {path: 'comment/need-audit', name: 'Recommended Category', component: CommentNeedAuditList},
        {path: 'post/list', name: 'Post List', component: Posts},
        {path: 'post/featured', name: 'Featured Post', component: FeaturedPosts},
        {path: 'post/top', name: 'Top Post', component: TopPost},
        {path: 'post/edit/:id', name: 'Edit Post', component: EditPost},
        {path: 'post/new', name: 'New Post', component: EditPost},
        {path: 'post/upload', name: 'Upload Post', component: UploadPost},
        {path: 'photo/list', name: 'Photo List', component: Photos},
        {path: 'photo/featured', name: 'Featured Photo', component: FeaturedPhotos},
        {path: 'visit_record/list', name: 'Visit Record', component: VisitRecordList},
        {path: 'config/list', name: 'Configuration Center', component: ConfigList},
        {path: 'link/list', name: 'Friend Link Management', component: LinkList},
        {path: 'link_exchange/list', name: 'Link Exchange Application', component: LinkExchangeList},
      ]
    },
    {path: '/Login', name: 'Login', component: Login},
    {path: '/404', name: 'NotFound', component: NotFound},
  ]
})

// Route Guards
router.beforeEach((to, from, next) => {
  if (auth.isExpired()) {
    auth.logout()
    router.push('/login')
  }

  if (to.path === '/login') {
    // Access the login page. If already logged in, redirect to the home page
    if (auth.isLogin()) next({path: '/'})
    else next()
  } else {
    if (!auth.isLogin()) {
      // If not logged in and trying to access a protected route, redirect to login page
      next({path: '/login'})
    }
    next()
  }
})

export default router
