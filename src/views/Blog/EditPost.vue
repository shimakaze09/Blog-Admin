<template>
  <el-container>
    <el-header height="30px">
      <el-row :gutter="6">
        <el-col :span="3">
          <el-select v-model="postCategoryName" filterable placeholder="Select Category" v-on:change="categoryChange">
            <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="20">
          <el-input v-model="postTitle" placeholder="Article Title"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" plain>Save</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <v-md-editor v-model="postContent" :default-show-toc="true" :codemirror-style-reset="true"
        @fullscreen-change="fullscreenChange" height="750px" />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "EditPost",
  data() {
    return {
      postTitle: '',
      postCategoryName: '',
      postCategoryId: 0,
      postContent: '',
      post: null,
      categories: [],
    }
  },
  mounted() {
    this.loadPost()
    this.loadCategories()
  },
  methods: {
    fullscreenChange(isFullscreen) {
      this.$store.commit('onFullscreenChange')
    },
    categoryChange(categoryId) {
      this.postCategoryId = categoryId
    },
    loadPost() {
      let id = this.$route.params.id
      if (id) {
        this.$api.blogPost.get(id)
          .then(res => {
            this.post = res.data
            this.postTitle = this.post.title
            this.postContent = this.post.content
            this.postCategoryId = this.post.categoryId
            this.postCategoryName = this.post.category.name
          })
          .catch(res => this.$message.error(`Failed to retrieve information. ${res.message}`))
      } else
        this.$message.error('Article ID was not specified')
    },
    loadCategories() {
      this.$api.category.getAll().then(res => this.categories = res.data)
    },
  }
}
</script>

<style scoped>
.v-md-editor {
  text-align: start;
}
</style>
