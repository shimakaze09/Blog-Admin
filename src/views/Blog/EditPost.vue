<template>
  <el-container>
    <el-header height="30px">
      <el-row :gutter="6">
        <el-col :span="23">
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
      postContent: '',
      post: null,
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (id) {
      this.$api.blogPost.get(id)
        .then(res => {
          this.post = res.data
          this.postTitle = this.post.title
          this.postContent = this.post.content
        })
        .catch(res => this.$message.error(`Failed to retrieve information. ${res.message}`))
    } else
      this.$message.error('Article ID was not specified')
  },
  methods: {
    fullscreenChange(isFullscreen) {
      console.log('Toggle fullscreen', isFullscreen)
      this.$store.commit('onFullscreenChange')
    }
  }
}
</script>

<style scoped>
.v-md-editor {
  text-align: start;
}
</style>
