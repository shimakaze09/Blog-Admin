<template>
  <mavon-editor v-model="post.content" :style="'height: 800px'" />
</template>

<script>
export default {
  name: "EditPost",
  data() {
    return {
      post: null
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (id) {
      this.$api.blogPost.get(id)
        .then(res => this.post = res.data)
        .catch(res => this.$message.error(`Failed to retrieve information. ${res.message}`))
    } else
      this.$message.error('Article ID was not specified')
  }
}
</script>

<style scoped></style>
