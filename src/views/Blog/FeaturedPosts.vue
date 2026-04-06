<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%;">
    <el-table-column
      label="ID"
      prop="id"
      width="50">
    </el-table-column>
    <el-table-column
      label="Article ID"
      prop="post.id"
      width="150">
    </el-table-column>
    <el-table-column
      label="Article Category"
      prop="post.category.name"
      width="250">
    </el-table-column>
    <el-table-column
      :show-overflow-tooltip="true"
      label="Article Title"
      prop="post.title">
    </el-table-column>
    <el-table-column align="right" width="280">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          placeholder="Enter keyword to search"
          size="mini"/>
      </template>
      <template slot-scope="scope">
        <el-button
          plain
          size="mini" type="warning"
          @click="cancelFeatured(scope.$index, scope.row)">Cancel Featured
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "FeaturedPosts",
  data() {
    return {
      loading: false,
      data: [],
      search: ''
    }
  },
  computed: {
    tableData() {
      return this.data.filter(item =>
        !this.search || item.post.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      this.$api.featuredPost.getAll()
        .then(res => this.data = res.data)
        .catch(res => {
          console.error(res)
          this.$message.error(res.message)
        })
        .finally(() => this.loading = false)
    },
    cancelFeatured(index, item) {
      this.$confirm('Are you sure?', 'Warning', {type: 'warning'})
        .then(() => {
          this.$api.featuredPost.deleteItem(item.id)
            .then(res => this.$message.success(`Operation successful. ${res.message}`))
            .catch(res => this.$message.error(`Operation failed. ${res.message}`))
            .finally(() => this.loadData())
        })
        .catch(() => this.$message('Operation cancelled'))
    },
  }
}
</script>

<style scoped></style>
