<template>
  <el-result icon="info" subTitle="Current top post information" title="Top Post">
    <template slot="extra">
      <p>ID: {{ data.id }}</p>
      <p>Title: {{ data.title }}</p>
      <p>Category: {{ data.category.name }}</p>
      <el-button plain size="medium" type="primary" @click="viewPost">View Post</el-button>
    </template>
  </el-result>
</template>

<script>
export default {
  name: "TopPost",
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$api.blog.top()
        .then(res => this.data = res.data)
    },
    viewPost() {
      this.$message('Function not implemented')
    }
  }
}
</script>

<style scoped></style>
