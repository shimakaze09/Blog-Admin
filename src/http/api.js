// Interface integration module
import * as auth from './modules/auth'
import * as blog from './modules/blog'
import * as blogPost from './modules/blogPost'
import * as category from './modules/category'
import * as featuredCategory from './modules/featuredCategory'
import * as featuredPhoto from './modules/featuredPhoto'
import * as featuredPost from './modules/featuredPost'
import * as photo from './modules/photo'

// Export everything by default
export default {
  auth,
  blog,
  blogPost,
  category,
  featuredCategory,
  featuredPhoto,
  featuredPost,
  photo
}
