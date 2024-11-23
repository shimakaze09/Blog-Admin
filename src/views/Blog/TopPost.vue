<template>
  <el-result icon="info" subTitle="Current top post information" title="Top Post">
    <template slot="extra">
      <p>Category: {{ data.category.name }}</p>
      <p>ID：{{ data.id }}</p>
      <el-link :href="`${baseUrl}/Blog/Post/${data.id}`" target="_blank" type="primary">Title: {{
          data.title
        }}
      </el-link>
    </template>
  </el-result>
</template>

<script>
import {baseUrl} from "@/utils/global";

export default {
  name: "TopPost",
  data() {
    return {
      data: null,
      baseUrl: baseUrl
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
  }
}
</script>

<style scoped></style>
